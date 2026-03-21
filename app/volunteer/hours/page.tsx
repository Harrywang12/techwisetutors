"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import VolunteerPortalNav from "../portal/VolunteerPortalNav";
import HoursForm from "./HoursForm";

interface HourLog {
  id: string;
  date: string;
  hours: number;
  activityType: string;
  location: string;
  notes: string;
  status: string;
  adminNotes: string | null;
}

interface VolunteerData {
  fullName: string;
  hourLogs: HourLog[];
  totalApproved: number;
  totalPending: number;
  totalRejected: number;
}

export default function VolunteerHoursPage() {
  const [data, setData] = useState<VolunteerData | null>(null);
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/volunteer/hours");
    if (res.ok) {
      setData(await res.json());
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full" />
      </div>
    );
  }

  const filtered = tab === "all" ? data.hourLogs : data.hourLogs.filter((h) => h.status === tab);

  return (
    <>
      <VolunteerPortalNav volunteerName={data.fullName} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">My Hours</h1>
          <p className="text-gray-500 mt-1">Log and track your volunteer hours.</p>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="card flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.totalApproved}</div>
              <div className="text-sm text-gray-500">Approved Hours</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.totalPending}</div>
              <div className="text-sm text-gray-500">Pending Hours</div>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.totalRejected}</div>
              <div className="text-sm text-gray-500">Rejected Hours</div>
            </div>
          </div>
        </div>

        {/* Log Form */}
        <div className="mb-10">
          <HoursForm onSubmitted={fetchData} />
        </div>

        {/* Hours List */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Hour Logs</h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-100 pb-3">
            {(["all", "pending", "approved", "rejected"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  tab === t ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">No {tab === "all" ? "" : tab} hour logs found.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">{log.activityType}</div>
                    <div className="text-gray-500 text-sm">{log.date} &middot; {log.location}</div>
                    {log.notes && <div className="text-gray-400 text-xs mt-1">{log.notes}</div>}
                    {log.adminNotes && (
                      <div className="text-xs mt-1 text-primary-600">Admin: {log.adminNotes}</div>
                    )}
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="font-bold text-gray-900">{log.hours}h</div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      log.status === "approved" ? "bg-green-100 text-green-700" :
                      log.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
