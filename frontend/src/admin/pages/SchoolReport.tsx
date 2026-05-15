import { useEffect, useState } from "react";
import axios from "axios";
import {
  Download,
  School,
  Users,
  Calendar,
  Award,
  FileText,
  Loader2,
  Search
} from "lucide-react";

type SchoolData = {
  school_name: string;
  total_students: number;
  total_events: number;
};

const SchoolReport = () => {
  const [data, setData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/school-report");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching report", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FULL REPORT PDF (ALL SCHOOLS)
  const downloadPDF = () => {
    window.open(
      "http://localhost:8000/api/school-student-report/download",
      "_blank"
    );
  };

  // 🔥 SINGLE SCHOOL PDF (BONUS FEATURE)
  const downloadSingleSchool = (schoolName: string) => {
    window.open(
      `http://localhost:8000/api/school-student-report/download?school=${schoolName}`,
      "_blank"
    );
  };

  const filteredData = data.filter((item) =>
    item.school_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = data.reduce(
    (sum, item) => sum + item.total_students,
    0
  );

  const totalEvents = data.reduce(
    (sum, item) => sum + item.total_events,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              School <span className="text-amber-500">Report</span>
            </h1>
          </div>

          <button
            onClick={downloadPDF}
            className="bg-amber-600 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Download size={16} />
            Download Full PDF
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-xl">
            <School />
            <p>{data.length} Schools</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <Users />
            <p>{totalStudents} Students</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <Calendar />
            <p>{totalEvents} Events</p>
          </div>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search school..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-slate-800"
        />

        {/* TABLE */}
        <div className="bg-slate-900 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto" />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800">
                  <th className="p-4 text-left">School</th>
                  <th className="p-4 text-center">Students</th>
                  <th className="p-4 text-center">Events</th>
                  <th className="p-4 text-center">Download</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="p-4 flex items-center gap-2">
                      <Award size={16} />
                      {item.school_name}
                    </td>

                    <td className="p-4 text-center">
                      {item.total_students}
                    </td>

                    <td className="p-4 text-center">
                      {item.total_events}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          downloadSingleSchool(item.school_name)
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg text-sm"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolReport;