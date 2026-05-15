import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../api";

// 🎥 Videos
import sportsVideo from "../../assets/sports.mp4";
import performingVideo from "../../assets/Classical.mp4";
import artsVideo from "../../assets/Visual.mp4";
import funVideo from "../../assets/Visual.mp4";
import axiosInstance from "../../axiosInstance";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  image: string;
  time: string;
  start_time: string;
  end_time: string;
  event_date: string;
  entry_fee: number;
  status: string;
  booking_last_date: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
  events: Event[];
};
type PaymentState = {
  event: Event;
  isTeam: boolean;
};
export default function EventsByCategory() {
  // const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state: PaymentState };

  const [category, setCategory] = useState<Category | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // TEAM POPUP
  // const [showPopup, setShowPopup] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // const [teamName, setTeamName] = useState("");
  // const [members, setMembers] = useState<string[]>([""]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [teamName, setTeamName] = useState("");
  const isBookingClosed = (event: Event) => {
    if (!event.booking_last_date) return false;

    const today = new Date();
    const lastDate = new Date(event.booking_last_date);

    today.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    return today > lastDate;
  };

  useEffect(() => {
    api
      .get(`/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const videoMap: { [key: string]: string } = {
    sports: sportsVideo,
    visual: artsVideo,
    arts: performingVideo,
    fun: funVideo,
    misc: funVideo,
  };

  const getVideoByCategory = (name: string) => {
    const key = name.toLowerCase();
    const matchedKey = Object.keys(videoMap).find((k) => key.includes(k));
    return matchedKey ? videoMap[matchedKey] : sportsVideo;
  };

  const handleSoloBooking = async (event: Event) => {
    const studentId = localStorage.getItem("student_id");

    console.log("localStorage student_id =", studentId);
    console.log("clicked event =", event);

    if (!studentId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      setLoadingId(event.id);

      const payload = {
        student_id: studentId,
        event_id: event.id,
        event_time: `${event.event_date} ${event.start_time}`,
        amount: event.entry_fee || 0,
      };

      console.log("register payload =", payload);

      const res = await api.post("/register-event", payload);

      navigate("/payment", {
        state: {
          isTeam: false,
          event_student_id: res.data.event_student_id,
          event_name: res.data.event_name || event.name,
          amount: res.data.amount ?? event.entry_fee ?? 0,
        },
      });

    } catch (error: any) {
      console.log("register error =", error?.response?.data);
      alert(error?.response?.data?.message || "Please register");
    } finally {
      setLoadingId(null);
    }
  };

  const openTeamPopup = (event: Event) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setSelectedEvent(event);
    setTeamName("");
    setShowPopup(true);
  };
  const handleTeamSubmit = async () => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (!selectedEvent) {
      alert("No event selected");
      return;
    }

    try {
      setLoadingId(selectedEvent.id);

      const schoolName = localStorage.getItem("school_name");

      if (!schoolName) {
        alert("School name not found. Please login again.");
        navigate("/login");
        return;
      }

      const payload = {
        event_id: selectedEvent.id,
        captain_id: Number(studentId),
        team_name: schoolName, // ✅ using school name
        event_name: selectedEvent.name
      };

      const res = await api.post("/team-name", payload);

      setShowPopup(false);

      navigate("/payment", {
        state: {
          isTeam: true,
          team_id: res.data.team_id,
          team_name: res.data.team_name || schoolName,
          event_student_id: res.data.event_student_id,
          event_name: res.data.event_name || selectedEvent.name,
          amount: res.data.amount ?? selectedEvent.entry_fee ?? 0,
        },
      });

    } catch (error: any) {
      alert(error?.response?.data?.message || "Team name save failed");
    } finally {
      setLoadingId(null);
    }
  };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [schoolName, setSchoolName] = useState("");
    const [studentId, setStudentId] = useState("");

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/me");
      // setIsLoggedIn(true);
      setSchoolName(res.data.school_name);
      setStudentId(res.data.id);

    } catch {
      // setIsLoggedIn(false);
    }
  };

  // HttpOnly token cookie can't be read from document.cookie,
  // so call /me directly and let the backend validate the session.
  checkAuth();
}, []);
  const handleBookNow = (event: Event) => {
    if (isBookingClosed(event)) {
      alert("Booking closed ❌");
      return;
    }


    // const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        event,
        isTeam: event.type?.toLowerCase().includes("team"),
      },
    });
  };

  if (!category) {
    return <div className="text-center mt-20">Loading...</div>;
  }
  const handlePaymentSuccess = async () => {
    const { event, isTeam } = location.state;
    const studentId = localStorage.getItem("student_id");

    try {
      if (isTeam) {
        // TEAM API
        const res = await api.post("/team-name", {
          event_id: event.id,
          captain_id: Number(studentId),
          team_name: localStorage.getItem("school_name"),
          event_name: event.name,
        });

        console.log("Team booking success", res.data);

      } else {
        // SOLO API
        const res = await api.post("/register-event", {
          student_id: studentId,
          event_id: event.id,
          event_time: `${event.event_date} ${event.start_time}`,
          amount: event.entry_fee || 0,
        });

        console.log("Solo booking success", res.data);
      }

      alert("Booking confirmed ✅");

    } catch (err) {
      console.error(err);
      alert("Booking failed after payment ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-[350px]">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={getVideoByCategory(category.name)} />
        </video>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">{category.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {category.events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg">
              <img
                src={`http://127.0.0.1:8000/upload/events/${event.image}`}
                className="h-48 w-full object-cover rounded-t-xl"
                alt={event.name}
              />

              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{event.name}</h3>

                <p className="text-sm text-gray-500 mt-2">{event.age_group}</p>

                <p className="text-blue-500 text-sm mt-1">
                  ⏰{" "}
                  {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* 🔥 NEW: Last Booking Date */}
                <p className="text-xs text-red-500 mt-1">
                  Register Last Date: {event.booking_last_date}
                </p>

                <p className="text-green-600 font-bold mt-1">
                  ₹ {event.entry_fee || 0}
                </p>

                <p className="text-xs text-purple-500 mt-1">{event.type}</p>
              </div>

              <div className="p-3 flex justify-end">
                <button
                  disabled={isBookingClosed(event) || loadingId === event.id}
                  onClick={() => handleBookNow(event)}
                  className={`px-3 py-1 rounded text-white ${event.status === "completed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500"
                    }`}
                >
                  {loadingId === event.id
                    ? "Processing..."
                    : isBookingClosed(event)
                      ? "Closed"
                      : event.type && event.type.trim().toLowerCase().includes("team")
                        ? "Book Team"
                        : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-xl w-96 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-3 text-center">Team</h2>


            <input
              value={localStorage.getItem("school_name") || ""}
              readOnly
              className="border p-2 w-full mb-3 bg-gray-100"
            />

            <button
              onClick={handleTeamSubmit}
              className="bg-green-500 text-white w-full py-2 rounded font-bold"
            >
              Submit & Go Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}