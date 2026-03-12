import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const companyLogo = "data:image/png;base64,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";

const donutColors = ["#22c55e", "#86efac", "#15803d", "#4ade80"];
const avatarPalette = [
  "from-green-200 to-green-400",
  "from-emerald-200 to-emerald-400",
  "from-lime-200 to-green-300",
  "from-teal-200 to-emerald-300",
  "from-green-100 to-lime-300",
];

function createMember(
  branchCode,
  branchIndex,
  memberIndex,
  name,
  role,
  status,
  score,
  entryDate,
  customers,
  conversionRate,
  revenue,
  weeklySales,
  customerMix,
  pipeline
) {
  return {
    id: `${branchCode}-${memberIndex + 1}`,
    name,
    role,
    status,
    score,
    entryDate,
    avatarSeed: (branchIndex + memberIndex) % avatarPalette.length,
    customers,
    conversionRate,
    revenue,
    weeklySales,
    customerMix,
    pipeline,
  };
}

const branchDefinitions = [
  ["001-HQ", "HO-Main", "HQ"],
  ["002-NRD", "Norodom", "NRD"],
  ["003-BSL", "Boeung Salang", "BSL"],
  ["004-TLK", "Toul Kork", "TLK"],
  ["005-PDT", "Psar Daem Tkov", "PDT"],
  ["006-NRM", "Noro Mall Branch", "NRM"],
  ["007-BTK", "Bak Touk Branch", "BTK"],
  ["008-MTT", "Mao Tse Tong", "MTT"],
  ["009-BTB", "Battambang Provincial Branch", "BTB"],
  ["010-KPC", "Kampong Cham Provincial Branch", "KPC"],
  ["011-SRB", "Siemreap Provincial Branch", "SRB"],
  ["012-271", "271 Mega Mall Branch", "271MM"],
  ["013-SSM", "Sensok Mall Branch", "SSM"],
  ["014-598", "598 Mall Branch", "598"],
  ["015-VSR", "Veng Sreng Branch", "VSR"],
  ["016-CMT", "Chip Mong Tower Branch", "CMT"],
];

const memberTemplates = [
  {
    name: "Rith Dara",
    role: "Senior RM",
    status: "Active",
    score: "92%",
    entryDate: "2021-02-15",
    customers: 86,
    conversionRate: "34%",
    revenue: 48200,
    weeklySales: [9, 12, 11, 15, 18],
    customerMix: [32, 24, 18, 12],
    pipeline: [24, 30, 28, 35, 41],
  },
  {
    name: "Chan Sreypich",
    role: "RM",
    status: "Active",
    score: "88%",
    entryDate: "2022-07-08",
    customers: 71,
    conversionRate: "29%",
    revenue: 39700,
    weeklySales: [7, 8, 10, 12, 13],
    customerMix: [28, 21, 14, 8],
    pipeline: [18, 22, 25, 27, 30],
  },
  {
    name: "Keo Visal",
    role: "RM",
    status: "On Leave",
    score: "84%",
    entryDate: "2020-11-21",
    customers: 54,
    conversionRate: "24%",
    revenue: 28900,
    weeklySales: [6, 7, 6, 8, 9],
    customerMix: [22, 14, 10, 8],
    pipeline: [12, 15, 14, 17, 18],
  },
  {
    name: "Lim Sothea",
    role: "Junior RM",
    status: "Active",
    score: "81%",
    entryDate: "2023-01-10",
    customers: 49,
    conversionRate: "22%",
    revenue: 25400,
    weeklySales: [5, 6, 7, 7, 8],
    customerMix: [18, 12, 11, 8],
    pipeline: [10, 12, 14, 15, 16],
  },
  {
    name: "Phan Nary",
    role: "RM",
    status: "Active",
    score: "86%",
    entryDate: "2021-09-03",
    customers: 64,
    conversionRate: "27%",
    revenue: 34600,
    weeklySales: [6, 9, 8, 11, 12],
    customerMix: [24, 18, 13, 9],
    pipeline: [15, 19, 21, 24, 27],
  },
];

const branches = branchDefinitions.map(([code, name, shortCode], branchIndex) => {
  const offset = branchIndex % 4;

  const members = memberTemplates.map((template, memberIndex) => {
    const adjustedSales = template.weeklySales.map((value, idx) => ({
      week: `W${idx + 1}`,
      sales: value + offset,
    }));

    const adjustedMix = [
      { name: "Deposit", value: template.customerMix[0] + offset },
      { name: "Loan", value: template.customerMix[1] + offset },
      { name: "Card", value: template.customerMix[2] + (offset % 2) },
      { name: "Other", value: template.customerMix[3] + (offset % 3) },
    ];

    const adjustedPipeline = template.pipeline.map((value, idx) => ({
      week: `W${idx + 1}`,
      value: value + offset * 2 + idx,
    }));

    const adjustedCustomers = template.customers + offset * 3 + memberIndex;
    const adjustedRevenue = template.revenue + offset * 2200 + memberIndex * 450;

    return createMember(
      code,
      branchIndex,
      memberIndex,
      template.name,
      template.role,
      template.status,
      template.score,
      template.entryDate,
      adjustedCustomers,
      template.conversionRate,
      `$${adjustedRevenue.toLocaleString()}`,
      adjustedSales,
      adjustedMix,
      adjustedPipeline
    );
  });

  return {
    code,
    shortCode,
    name,
    manager: `Branch Manager ${branchIndex + 1}`,
    members,
  };
});

function getStatusStyle(status) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "On Leave") return "bg-amber-100 text-amber-700";
  return "bg-blue-100 text-blue-700";
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getAvatarClass(seed = 0) {
  return avatarPalette[seed % avatarPalette.length];
}

function formatEntryDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SummaryCard({ label, value, subvalue }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-green-100">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
      <p className="mt-1 text-sm text-green-700">{subvalue}</p>
    </div>
  );
}

export default function BranchMembersDashboard() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [memberFilter, setMemberFilter] = useState("All");
  const [showMemberList, setShowMemberList] = useState(false);
  const [search, setSearch] = useState("");

  const currentBranch = useMemo(
    () => branches.find((branch) => branch.code === selectedBranch) ?? null,
    [selectedBranch]
  );

  const branchPerformance = useMemo(() => {
    if (!currentBranch) return null;

    const totalCustomers = currentBranch.members.reduce((sum, member) => sum + member.customers, 0);
    const totalRevenue = currentBranch.members.reduce(
      (sum, member) => sum + Number(member.revenue.replace(/[$,]/g, "")),
      0
    );
    const activeMembers = currentBranch.members.filter((member) => member.status === "Active").length;
    const branchWeeklySales = Array.from({ length: 5 }, (_, index) => ({
      week: `W${index + 1}`,
      sales: currentBranch.members.reduce((sum, member) => sum + (member.weeklySales[index]?.sales ?? 0), 0),
    }));
    const roleMix = [
      {
        name: "Senior RM",
        value: currentBranch.members.filter((member) => member.role === "Senior RM").length,
      },
      { name: "RM", value: currentBranch.members.filter((member) => member.role === "RM").length },
      {
        name: "Junior RM",
        value: currentBranch.members.filter((member) => member.role === "Junior RM").length,
      },
      {
        name: "Other",
        value: currentBranch.members.filter(
          (member) => !["Senior RM", "RM", "Junior RM"].includes(member.role)
        ).length,
      },
    ];
    const rmBars = currentBranch.members.map((member) => ({
      name: member.name.split(" ")[0],
      sales: member.weeklySales.reduce((sum, item) => sum + item.sales, 0),
    }));

    return {
      totalCustomers,
      totalRevenue: `$${totalRevenue.toLocaleString()}`,
      activeMembers,
      averageScore: `${Math.round(
        currentBranch.members.reduce(
          (sum, member) => sum + Number(member.score.replace("%", "")),
          0
        ) / currentBranch.members.length
      )}%`,
      weeklySales: branchWeeklySales,
      roleMix,
      rmBars,
    };
  }, [currentBranch]);

  const filteredMembers = useMemo(() => {
    if (!currentBranch) return [];

    const keyword = search.trim().toLowerCase();

    return currentBranch.members.filter((member) => {
      const matchesFilter = memberFilter === "All" || member.name === memberFilter;
      const matchesSearch =
        !keyword ||
        [member.name, member.role, member.status, currentBranch.code, currentBranch.shortCode, member.entryDate]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesFilter && matchesSearch;
    });
  }, [currentBranch, memberFilter, search]);

  const selectedMember = useMemo(() => {
    if (!currentBranch || !selectedMemberId) return null;
    return currentBranch.members.find((member) => member.id === selectedMemberId) ?? null;
  }, [currentBranch, selectedMemberId]);

  const activeCount = currentBranch
    ? currentBranch.members.filter((member) => member.status === "Active").length
    : 0;

  const otherCount = currentBranch ? currentBranch.members.length - activeCount : 0;

  return (
    <div className="min-h-screen bg-[#edf5ed] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[32px] bg-white/80 p-6 shadow-sm ring-1 ring-green-100 backdrop-blur md:p-8">
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-center md:text-left">
            <img
              src={companyLogo}
              alt="Chip Mong Bank logo"
              className="h-24 w-24 object-contain md:h-28 md:w-28"
            />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-green-700">
                CHIP MONG BANK
              </p>
              <h1 className="mt-2 text-4xl font-bold text-slate-800 md:text-5xl">
                CMCB RM Performance
              </h1>
            </div>
          </div>
        </div>

        {!currentBranch ? (
          <div>
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                Branch Member Directory
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-800 md:text-4xl">
                Select a Branch
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Choose one branch first, then review branch performance and RM details.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {branches.map((branch) => (
                <button
                  key={branch.code}
                  type="button"
                  onClick={() => {
                    setSelectedBranch(branch.code);
                    setSelectedMemberId(null);
                    setMemberFilter("All");
                    setShowMemberList(false);
                    setSearch("");
                  }}
                  className="group rounded-[28px] bg-white p-6 text-left shadow-sm ring-1 ring-green-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Branch Code</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-800">{branch.code}</h3>
                    </div>
                    <div className="rounded-2xl bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {branch.members.length} Members
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-base font-semibold text-slate-700">{branch.name}</p>
                    <p className="text-sm text-slate-500">Short Name: {branch.shortCode}</p>
                    <p className="text-sm text-slate-500">Manager: {branch.manager}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between text-sm text-green-700">
                    <span className="font-medium">Open Branch Dashboard</span>
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : !selectedMember ? (
          <div>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                  Branch Performance
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-800 md:text-4xl">
                  {currentBranch.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Review overall branch performance first, then use the RM window below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedBranch(null);
                  setSelectedMemberId(null);
                  setMemberFilter("All");
                  setShowMemberList(false);
                  setSearch("");
                }}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5"
              >
                ← Back to Branches
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                label="Average Score"
                value={branchPerformance?.averageScore ?? "0%"}
                subvalue="Branch overall performance"
              />
              <SummaryCard
                label="Active Members"
                value={branchPerformance?.activeMembers ?? 0}
                subvalue="Currently active RM count"
              />
              <SummaryCard
                label="Total Customers"
                value={branchPerformance?.totalCustomers ?? 0}
                subvalue="Managed by this branch"
              />
              <SummaryCard
                label="Total Revenue"
                value={branchPerformance?.totalRevenue ?? "$0"}
                subvalue="Monthly branch contribution"
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100 xl:col-span-2">
                <div className="mb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    Branch Trend
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">
                    Weekly Sales by Branch
                  </h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={branchPerformance?.weeklySales ?? []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <div className="mb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    Team Structure
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">Role Distribution</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={branchPerformance?.roleMix ?? []}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={3}
                      >
                        {(branchPerformance?.roleMix ?? []).map((entry, index) => (
                          <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] bg-[#f6fbf6] p-4 shadow-sm ring-1 ring-green-100 md:p-6">
              <div className="mb-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-green-100">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                      RM Window
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800">Open RM List</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Click the button below to show the list of RM in this branch.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMemberList((prev) => !prev)}
                    className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                  >
                    {showMemberList ? "Hide RM List" : "Show RM List"}
                  </button>
                </div>
              </div>

              {showMemberList && (
                <>
                  <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-3">
                      <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                        All ({currentBranch.members.length})
                      </div>
                      <div className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                        Active ({activeCount})
                      </div>
                      <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                        Other ({otherCount})
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                      <select
                        value={memberFilter}
                        onChange={(event) => setMemberFilter(event.target.value)}
                        className="rounded-full border border-green-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-green-300"
                      >
                        <option value="All">All RM</option>
                        {currentBranch.members.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>

                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search member"
                        className="w-full rounded-full border border-green-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-green-300 md:w-72"
                      />
                    </div>
                  </div>

                  <div className="mb-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-green-100">
                    <div className="mb-5">
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                        RM Comparison
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-800">
                        Sales Contribution by RM
                      </h3>
                    </div>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={branchPerformance?.rmBars ?? []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[28px] bg-[#eaf7e8] ring-1 ring-green-100">
                    <div className="grid grid-cols-12 gap-3 border-b border-green-100 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-2">Role</div>
                      <div className="col-span-2">Branch</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Score</div>
                      <div className="col-span-1 text-right">Open</div>
                    </div>

                    <div className="divide-y divide-green-100">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                          <button
                            key={member.id}
                            type="button"
                            onClick={() => setSelectedMemberId(member.id)}
                            className="grid w-full grid-cols-12 items-center gap-3 bg-[#f7fcf6] px-6 py-5 text-left transition hover:bg-white"
                          >
                            <div className="col-span-4 flex items-center gap-3">
                              <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarClass(member.avatarSeed)} text-sm font-bold text-green-900 shadow-sm ring-2 ring-white`}
                              >
                                {getInitials(member.name)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{member.name}</p>
                                <p className="text-sm text-slate-500">rm{index + 1}@bank.com</p>
                                <p className="text-xs text-slate-400">
                                  Entry: {formatEntryDate(member.entryDate)}
                                </p>
                              </div>
                            </div>

                            <div className="col-span-2 text-sm text-slate-700">{member.role}</div>
                            <div className="col-span-2 text-sm text-slate-700">{currentBranch.shortCode}</div>
                            <div className="col-span-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(member.status)}`}
                              >
                                {member.status}
                              </span>
                            </div>
                            <div className="col-span-1 text-sm font-semibold text-slate-700">
                              {member.score}
                            </div>
                            <div className="col-span-1 text-right text-lg text-green-700">→</div>
                          </button>
                        ))
                      ) : (
                        <div className="px-6 py-10 text-center text-sm text-slate-500">
                          No members found for your selection.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarClass(selectedMember.avatarSeed)} text-2xl font-bold text-green-900 shadow-sm ring-4 ring-white`}
                >
                  {getInitials(selectedMember.name)}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    RM Performance
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-800 md:text-4xl">
                    {selectedMember.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {selectedMember.role} · {currentBranch.shortCode} · Entry Date: {formatEntryDate(selectedMember.entryDate)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedMemberId(null);
                  setShowMemberList(true);
                }}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5"
              >
                ← Back to Branch Dashboard
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                label="Performance Score"
                value={selectedMember.score}
                subvalue="Overall target achievement"
              />
              <SummaryCard
                label="Total Customers"
                value={selectedMember.customers}
                subvalue="Active customer base"
              />
              <SummaryCard
                label="Conversion Rate"
                value={selectedMember.conversionRate}
                subvalue="Lead to customer"
              />
              <SummaryCard
                label="Revenue"
                value={selectedMember.revenue}
                subvalue="Monthly sales contribution"
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100 xl:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                      Weekly Sales
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800">Sales by Week</h3>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedMember.weeklySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <div className="mb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    Customer Mix
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">
                    Customer Distribution
                  </h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedMember.customerMix}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={3}
                      >
                        {selectedMember.customerMix.map((entry, index) => (
                          <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid gap-2">
                  {selectedMember.customerMix.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl bg-[#f6fbf6] px-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: donutColors[index % donutColors.length] }}
                        />
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100 xl:col-span-2">
                <div className="mb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    Pipeline Trend
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">
                    Opportunity Growth
                  </h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedMember.pipeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        fill="#bbf7d0"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-green-100">
                <div className="mb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-700">
                    Performance Notes
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-800">Quick Insight</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[22px] bg-[#f6fbf6] p-4">
                    <p className="text-sm text-slate-500">Best Week</p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {
                        selectedMember.weeklySales.reduce((best, current) =>
                          current.sales > best.sales ? current : best
                        ).week
                      }
                    </p>
                  </div>
                  <div className="rounded-[22px] bg-[#f6fbf6] p-4">
                    <p className="text-sm text-slate-500">Total Weekly Sales</p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {selectedMember.weeklySales.reduce((sum, current) => sum + current.sales, 0)}
                    </p>
                  </div>
                  <div className="rounded-[22px] bg-[#f6fbf6] p-4">
                    <p className="text-sm text-slate-500">Status</p>
                    <p
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(selectedMember.status)}`}
                    >
                      {selectedMember.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
