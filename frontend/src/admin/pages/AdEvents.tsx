import { useEffect, useState } from "react";
import axios from "axios";

const AdEvents = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:8000/api/events");
    setEvents(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Events</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Event Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="text-center">
              <td className="p-2 border">{event.name}</td>

              <td className="p-2 border space-x-2">
                
                {/* 🔥 FULL REPORT */}
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:8000/api/event/${event.id}/schools-students/download`,
                      "_blank"
                    )
                  }
                  className="bg-green-500 px-3 py-1 rounded text-white"
                >
                  Full Report
                </button>

                {/* 🔥 SCHOOL LIST */}
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:8000/api/event/${event.id}/schools/download`,
                      "_blank"
                    )
                  }
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                >
                  School List
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdEvents;