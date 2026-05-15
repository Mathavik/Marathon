import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Calendar, Users, Building2, CheckCircle2 } from "lucide-react";

interface PaymentPageState {
  event: any;
  isTeam: boolean;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as PaymentPageState;

  const [paymentType, setPaymentType] = useState<string>("online");
  const [loading, setLoading] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>(() => localStorage.getItem("school_name") || "");
  const [teamMembers, setTeamMembers] = useState<string[]>([""]); // Start with one empty member
  const [maxTeamSize, setMaxTeamSize] = useState<number>(7); // Default to 7

  const isTeam = state?.isTeam === true;

  // Extract team size from event type
  React.useEffect(() => {
    if (isTeam && state?.event?.type) {
      const match = state.event.type.match(/Team \((\d+) players only\)/);
      if (match) {
        const size = parseInt(match[1]);
        setMaxTeamSize(size);
        // Initialize team members array with empty strings
        setTeamMembers(new Array(size - 1).fill("")); // -1 because captain is already included
      }
    }
  }, [isTeam, state?.event?.type]);

  // Handle team member input change
  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = value;
    setTeamMembers(newMembers);
  };

  // Add new team member
  const addTeamMember = () => {
    if (teamMembers.length < maxTeamSize - 1) { // -1 for captain
      setTeamMembers([...teamMembers, ""]);
    }
  };

  // Remove team member
  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const newMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(newMembers);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const studentId = localStorage.getItem("student_id");
      const { event, isTeam } = state;

      if (!event) {
        toast.error("Event data missing ❌");
        return;
      }
      if (!studentId) {
        toast.error("Please login first ❌");
        return;
      }

      let eventStudentId = null;

      if (isTeam) {
        const submittedTeamName = teamName.trim() || localStorage.getItem("school_name") || "";
        const validMembers = teamMembers.filter(member => member.trim() !== "");
        const requiredMemberCount = Math.max(maxTeamSize - 1, 0); // Captain is already included

        if (!submittedTeamName) {
          toast.error("School name is required for team registration ❌");
          return;
        }

        if (validMembers.length !== requiredMemberCount) {
          toast.error(`Please add exactly ${requiredMemberCount} team members for this event ❌`);
          return;
        }

        const res = await axios.post("http://127.0.0.1:8000/api/team-name", {
          event_id: event.id,
          captain_id: Number(studentId),
          team_name: submittedTeamName,
          event_name: event.name,
          members: validMembers, // Send team members
        });
        eventStudentId = res.data.event_student_id;
      } else {
        const res = await axios.post("http://127.0.0.1:8000/api/register-event", {
          student_id: studentId,
          event_id: event.id,
          event_time: `${event.event_date} ${event.start_time}`,
          amount: event.entry_fee || 0,
        });
        eventStudentId = res.data.event_student_id;
      }

      await axios.post("http://127.0.0.1:8000/api/payments", {
        event_student_id: eventStudentId,
        payment_id: "PAY" + Date.now(),
        payment_type: paymentType,
        amount: event.entry_fee || 0,
        payment_status: "paid",
        payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        transaction_id: "TXN" + Date.now(),
      });

      toast.success("Booking + Payment Success ✅");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#001F3F] tracking-tight">Checkout</h2>
          <p className="text-gray-600 mt-2 text-lg">Finalize your registration details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BOX 1: Booking Details */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,31,63,0.08)] border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3.5 bg-slate-100 rounded-2xl text-[#001F3F]">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#001F3F]">Booking Details</h3>
            </div>

            <div className="space-y-6">
              <DetailRow icon={<Users size={18}/>} label="Registration Type" value={isTeam ? "Team Entry" : "Individual Entry"} />
              <DetailRow icon={<CreditCard size={18}/>} label="Event Name" value={state?.event?.name || "N/A"} />
              {isTeam && (
                <DetailRow icon={<Building2 size={18}/>} label="School / Organization" value={localStorage.getItem("school_name") || "N/A"} />
              )}
              <DetailRow icon={<Calendar size={18}/>} label="Event Date" value={state?.event?.event_date || "N/A"} />
              
              {/* Team Name Display */}
              {isTeam && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-600">Team Name</label>
                  <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-[#001F3F] font-semibold">
                    {teamName || localStorage.getItem("school_name") || "School name not available"}
                  </div>
                </div>
              )}

              {/* Team Members Input */}
              {isTeam && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-600">
                      Team Members ({teamMembers.filter(m => m.trim()).length + 1}/{maxTeamSize})
                    </label>
                    {teamMembers.length < maxTeamSize - 1 && (
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="text-sm bg-[#001F3F] text-white px-3 py-1 rounded-md hover:bg-[#fecb00] hover:text-[#001F3F] transition-colors"
                      >
                        + Add Member
                      </button>
                    )}
                  </div>
                  
                  {/* Captain (current user) */}
                  <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
                    <Users size={16} className="text-[#001F3F]" />
                    <span className="text-sm font-medium text-[#001F3F]">Captain: {localStorage.getItem("student_name") || "You"}</span>
                    <span className="text-xs bg-[#fecb00] text-[#001F3F] px-2 py-1 rounded-full">Captain</span>
                  </div>

                  {/* Team Members */}
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        placeholder={`Team Member ${index + 1}`}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F] outline-none transition-all"
                        required
                      />
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 p-5 bg-slate-100 rounded-2xl border border-slate-200">
              <p className="text-sm text-[#001F3F] leading-relaxed">
                <strong>Important:</strong> A confirmation email will be sent shortly. Please keep your transaction ID for reference at the venue.
              </p>
            </div>
          </div>

          {/* BOX 2: Payment Summary & Action */}
          <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,31,63,0.08)] border border-slate-100 overflow-hidden">
            <div className="bg-[#001F3F] p-8 text-white">
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Total Payable</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-light">₹</span>
                <span className="text-5xl font-bold tracking-tight text-[#fecb00]">{state?.event?.entry_fee || 0}</span>
              </div>
            </div>

            <div className="p-8">
              <label className="block text-sm font-semibold text-[#001F3F] mb-3 ml-1">Payment Method</label>
              <div className="space-y-3 mb-8">
                <PaymentOption 
                  active={paymentType === "online"} 
                  onClick={() => setPaymentType("online")}
                  title="Online Payment"
                  desc="UPI, Cards, NetBanking"
                />
                <PaymentOption 
                  active={paymentType === "cash"} 
                  onClick={() => setPaymentType("cash")}
                  title="Cash on Spot"
                  desc="Pay at the venue counter"
                />
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] shadow-lg ${
                  loading 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-[#001F3F] text-white hover:bg-[#fecb00] hover:text-[#001F3F] hover:shadow-[#fecb00]/30"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : `Proceed to Pay ₹${state?.event?.entry_fee || 0}`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const DetailRow = ({ icon, label, value }: { icon: any, label: string, value: any }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3 text-slate-600">
      <div className="text-[#001F3F]/60 group-hover:text-[#001F3F] transition-colors">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

const PaymentOption = ({ active, onClick, title, desc }: any) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
      active ? "border-[#001F3F] bg-slate-50" : "border-slate-100 hover:border-slate-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className={`font-bold ${active ? "text-[#001F3F]" : "text-gray-800"}`}>{title}</p>
        <p className={`text-xs ${active ? "text-[#001F3F]/70" : "text-gray-500"}`}>{desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-[#001F3F]" : "border-gray-300"}`}>
        {active && <div className="w-2.5 h-2.5 bg-[#001F3F] rounded-full" />}
      </div>
    </div>
  </div>
);

export default PaymentPage;