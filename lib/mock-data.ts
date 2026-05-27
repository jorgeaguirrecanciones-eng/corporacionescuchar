// ─── Types ────────────────────────────────────────────────────────────────────

export type DonorStatus = "activo" | "pausado" | "cancelado";
export type DonorType = "mensual" | "unico";
export type CircleType = "online" | "presencial";
export type PaymentStatus = "aprobado" | "fallido" | "pendiente";

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: DonorType;
  status: DonorStatus;
  amount: number;   // CLP total mensual
  spaces: number;   // cantidad de espacios
  since: string;    // YYYY-MM-DD
  lastPayment?: string;
  mpSubscriptionId?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  circle: string;
  circleType: CircleType;
  period: string; // YYYY-MM
  registeredAt: string;
}

export interface Payment {
  id: string;
  donorId: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  period: string;
}

export interface MonthlyMatch {
  period: string;
  donorId: string;
  participantIds: string[];
  emailSent: boolean;
  emailSentAt?: string;
}

export interface EmailLog {
  id: string;
  period: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  subject: string;
  status: "enviado" | "abierto" | "rebotado";
  sentAt: string;
  openedAt?: string;
}

// ─── Donors ───────────────────────────────────────────────────────────────────

export const DONORS: Donor[] = [
  {
    id: "d1",
    name: "Camila Torres",
    email: "camila.torres@gmail.com",
    phone: "+56 9 8123 4567",
    type: "mensual",
    status: "activo",
    amount: 14000,
    spaces: 2,
    since: "2024-03-12",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-001",
  },
  {
    id: "d2",
    name: "Felipe Morales",
    email: "f.morales@outlook.com",
    phone: "+56 9 9234 5678",
    type: "mensual",
    status: "activo",
    amount: 7000,
    spaces: 1,
    since: "2024-06-20",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-002",
  },
  {
    id: "d3",
    name: "Valentina Ruiz",
    email: "vale.ruiz@gmail.com",
    type: "mensual",
    status: "activo",
    amount: 21000,
    spaces: 3,
    since: "2024-01-08",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-003",
  },
  {
    id: "d4",
    name: "Diego Sánchez",
    email: "diego.sanchez@empresa.cl",
    phone: "+56 9 7345 6789",
    type: "mensual",
    status: "activo",
    amount: 14000,
    spaces: 2,
    since: "2024-09-15",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-004",
  },
  {
    id: "d5",
    name: "Sofía Vega",
    email: "sofia.vega@gmail.com",
    type: "mensual",
    status: "activo",
    amount: 7000,
    spaces: 1,
    since: "2025-02-03",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-005",
  },
  {
    id: "d6",
    name: "Andrés Muñoz",
    email: "andres.munoz@hotmail.com",
    phone: "+56 9 6456 7890",
    type: "mensual",
    status: "activo",
    amount: 14000,
    spaces: 2,
    since: "2025-04-18",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-006",
  },
  {
    id: "d7",
    name: "Javiera Contreras",
    email: "javiera.c@gmail.com",
    type: "mensual",
    status: "activo",
    amount: 7000,
    spaces: 1,
    since: "2025-07-22",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-007",
  },
  {
    id: "d8",
    name: "Matías González",
    email: "matias.gonzalez@uc.cl",
    phone: "+56 9 5567 8901",
    type: "mensual",
    status: "activo",
    amount: 21000,
    spaces: 3,
    since: "2025-01-10",
    lastPayment: "2026-05-01",
    mpSubscriptionId: "SUB-008",
  },
  {
    id: "d9",
    name: "Paula Herrera",
    email: "p.herrera@gmail.com",
    type: "mensual",
    status: "pausado",
    amount: 14000,
    spaces: 2,
    since: "2024-11-30",
    lastPayment: "2026-03-01",
    mpSubscriptionId: "SUB-009",
  },
  {
    id: "d10",
    name: "Sebastián López",
    email: "seba.lopez@gmail.com",
    phone: "+56 9 4678 9012",
    type: "mensual",
    status: "pausado",
    amount: 7000,
    spaces: 1,
    since: "2025-05-14",
    lastPayment: "2026-02-01",
    mpSubscriptionId: "SUB-010",
  },
  {
    id: "d11",
    name: "Constanza Pérez",
    email: "coni.perez@gmail.com",
    type: "mensual",
    status: "cancelado",
    amount: 7000,
    spaces: 1,
    since: "2024-08-01",
    lastPayment: "2025-12-01",
  },
  {
    id: "d12",
    name: "Tomás Ibáñez",
    email: "tomas.ibanez@yahoo.com",
    type: "mensual",
    status: "cancelado",
    amount: 14000,
    spaces: 2,
    since: "2024-04-22",
    lastPayment: "2026-01-01",
  },
];

// ─── Participants ──────────────────────────────────────────────────────────────

export const PARTICIPANTS: Participant[] = [
  // May 2026
  { id: "p1",  name: "María González",     email: "maria.glez@gmail.com",   circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-05", registeredAt: "2026-05-02" },
  { id: "p2",  name: "Pedro Alvarado",     email: "pedro.alv@gmail.com",    circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-05", registeredAt: "2026-05-03" },
  { id: "p3",  name: "Ana Riquelme",       email: "ana.riq@outlook.com",    circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-05", registeredAt: "2026-05-04" },
  { id: "p4",  name: "Carlos Fuentes",     email: "carlos.f@gmail.com",     circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-05", registeredAt: "2026-05-05" },
  { id: "p5",  name: "Lucía Vargas",       email: "lucia.v@hotmail.com",    circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-05", registeredAt: "2026-05-06" },
  { id: "p6",  name: "Roberto Castillo",   email: "rcastillo@gmail.com",    circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-06" },
  { id: "p7",  name: "Carmen Flores",      email: "carmen.f@gmail.com",     circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-07" },
  { id: "p8",  name: "José Martínez",      email: "jose.mtz@gmail.com",     circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-08" },
  { id: "p9",  name: "Isabel Rojas",       email: "isabel.r@gmail.com",     circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-09" },
  { id: "p10", name: "Pablo Reyes",        email: "pablo.reyes@gmail.com",  circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-10" },
  { id: "p11", name: "Andrea Sepúlveda",   email: "andrea.sep@gmail.com",   circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-12" },
  { id: "p12", name: "Miguel Araya",       email: "miguel.a@outlook.com",   circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-13" },
  { id: "p13", name: "Daniela Castro",     email: "dani.castro@gmail.com",  circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-14" },
  { id: "p14", name: "Francisca Molina",   email: "franci.m@gmail.com",     circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-15" },
  { id: "p15", name: "Cristóbal Díaz",     email: "cristobal.d@gmail.com",  circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-05", registeredAt: "2026-05-16" },
  // April 2026
  { id: "p16", name: "Renata Silva",       email: "renata.s@gmail.com",     circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-04", registeredAt: "2026-04-03" },
  { id: "p17", name: "Ignacio Bravo",      email: "igna.bravo@gmail.com",   circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-04", registeredAt: "2026-04-04" },
  { id: "p18", name: "Paola Cáceres",      email: "paola.c@hotmail.com",    circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-05" },
  { id: "p19", name: "Rodrigo Espinoza",   email: "rodrigo.e@gmail.com",    circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-06" },
  { id: "p20", name: "Bárbara Núñez",      email: "barbara.n@gmail.com",    circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-08" },
  { id: "p21", name: "Gabriel Palma",      email: "gabriel.p@gmail.com",    circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-10" },
  { id: "p22", name: "Natalia Cortés",     email: "natalia.c@gmail.com",    circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-04", registeredAt: "2026-04-11" },
  { id: "p23", name: "Eduardo Lara",       email: "edu.lara@gmail.com",     circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-12" },
  { id: "p24", name: "Catalina Mora",      email: "cata.mora@outlook.com",  circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-14" },
  { id: "p25", name: "Simón Vergara",      email: "simon.v@gmail.com",      circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-04", registeredAt: "2026-04-15" },
  { id: "p26", name: "Amanda Leiva",       email: "amanda.l@gmail.com",     circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-16" },
  { id: "p27", name: "Nicolás Pinto",      email: "nico.pinto@gmail.com",   circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-18" },
  { id: "p28", name: "Lorena Salinas",     email: "lorena.s@gmail.com",     circle: "Círculo Online — Lunes 19:30",         circleType: "online",      period: "2026-04", registeredAt: "2026-04-19" },
  { id: "p29", name: "Marcelo Fuenzalida", email: "marcelo.f@hotmail.com",  circle: "Círculo Presencial — Santiago Centro", circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-20" },
  { id: "p30", name: "Ximena Tapia",       email: "ximena.t@gmail.com",     circle: "Círculo Presencial — Ñuñoa",           circleType: "presencial",  period: "2026-04", registeredAt: "2026-04-22" },
];

// ─── Payments ─────────────────────────────────────────────────────────────────

export const PAYMENTS: Payment[] = [
  // May 2026
  ...["d1","d2","d3","d4","d5","d6","d7","d8"].map((donorId, i) => ({
    id: `pay-may-${i}`,
    donorId,
    amount: DONORS.find(d => d.id === donorId)!.amount,
    status: "aprobado" as PaymentStatus,
    date: "2026-05-01",
    period: "2026-05",
  })),
  // April 2026
  ...["d1","d2","d3","d4","d5","d6","d7","d8"].map((donorId, i) => ({
    id: `pay-apr-${i}`,
    donorId,
    amount: DONORS.find(d => d.id === donorId)!.amount,
    status: "aprobado" as PaymentStatus,
    date: "2026-04-01",
    period: "2026-04",
  })),
  // March 2026
  ...["d1","d2","d3","d4","d5","d6","d7","d8"].map((donorId, i) => ({
    id: `pay-mar-${i}`,
    donorId,
    amount: DONORS.find(d => d.id === donorId)!.amount,
    status: "aprobado" as PaymentStatus,
    date: "2026-03-01",
    period: "2026-03",
  })),
  // Paused donors — last payments
  { id: "pay-pau-1", donorId: "d9",  amount: 14000, status: "aprobado", date: "2026-03-01", period: "2026-03" },
  { id: "pay-pau-2", donorId: "d10", amount: 7000,  status: "aprobado", date: "2026-02-01", period: "2026-02" },
];

// ─── Monthly Matches ───────────────────────────────────────────────────────────
// April 2026: already done and email sent
// May 2026: not yet matched

export const MATCHES: MonthlyMatch[] = [
  // April 2026 — done
  { period: "2026-04", donorId: "d1", participantIds: ["p16","p17"], emailSent: true, emailSentAt: "2026-05-02T10:15:00" },
  { period: "2026-04", donorId: "d2", participantIds: ["p18"],       emailSent: true, emailSentAt: "2026-05-02T10:15:01" },
  { period: "2026-04", donorId: "d3", participantIds: ["p19","p20","p21"], emailSent: true, emailSentAt: "2026-05-02T10:15:02" },
  { period: "2026-04", donorId: "d4", participantIds: ["p22","p23"], emailSent: true, emailSentAt: "2026-05-02T10:15:03" },
  { period: "2026-04", donorId: "d5", participantIds: ["p24"],       emailSent: true, emailSentAt: "2026-05-02T10:15:04" },
  { period: "2026-04", donorId: "d6", participantIds: ["p25","p26"], emailSent: true, emailSentAt: "2026-05-02T10:15:05" },
  { period: "2026-04", donorId: "d7", participantIds: ["p27"],       emailSent: true, emailSentAt: "2026-05-02T10:15:06" },
  { period: "2026-04", donorId: "d8", participantIds: ["p28","p29","p30"], emailSent: true, emailSentAt: "2026-05-02T10:15:07" },
];

// ─── Email Log ─────────────────────────────────────────────────────────────────

export const EMAIL_LOG: EmailLog[] = [
  // April matching emails (sent May 2)
  { id: "e1",  period: "2026-04", donorId: "d1", donorName: "Camila Torres",    donorEmail: "camila.torres@gmail.com",  subject: "Camila, este mes escuchaste a 2 personas",    status: "abierto",  sentAt: "2026-05-02T10:15:00", openedAt: "2026-05-02T11:32:00" },
  { id: "e2",  period: "2026-04", donorId: "d2", donorName: "Felipe Morales",   donorEmail: "f.morales@outlook.com",    subject: "Felipe, este mes escuchaste a 1 persona",     status: "abierto",  sentAt: "2026-05-02T10:15:01", openedAt: "2026-05-02T14:05:00" },
  { id: "e3",  period: "2026-04", donorId: "d3", donorName: "Valentina Ruiz",   donorEmail: "vale.ruiz@gmail.com",      subject: "Valentina, este mes escuchaste a 3 personas",  status: "abierto",  sentAt: "2026-05-02T10:15:02", openedAt: "2026-05-02T10:55:00" },
  { id: "e4",  period: "2026-04", donorId: "d4", donorName: "Diego Sánchez",    donorEmail: "diego.sanchez@empresa.cl", subject: "Diego, este mes escuchaste a 2 personas",     status: "enviado",  sentAt: "2026-05-02T10:15:03" },
  { id: "e5",  period: "2026-04", donorId: "d5", donorName: "Sofía Vega",       donorEmail: "sofia.vega@gmail.com",     subject: "Sofía, este mes escuchaste a 1 persona",      status: "abierto",  sentAt: "2026-05-02T10:15:04", openedAt: "2026-05-03T09:20:00" },
  { id: "e6",  period: "2026-04", donorId: "d6", donorName: "Andrés Muñoz",     donorEmail: "andres.munoz@hotmail.com", subject: "Andrés, este mes escuchaste a 2 personas",    status: "enviado",  sentAt: "2026-05-02T10:15:05" },
  { id: "e7",  period: "2026-04", donorId: "d7", donorName: "Javiera Contreras",donorEmail: "javiera.c@gmail.com",      subject: "Javiera, este mes escuchaste a 1 persona",    status: "abierto",  sentAt: "2026-05-02T10:15:06", openedAt: "2026-05-02T18:40:00" },
  { id: "e8",  period: "2026-04", donorId: "d8", donorName: "Matías González",  donorEmail: "matias.gonzalez@uc.cl",    subject: "Matías, este mes escuchaste a 3 personas",    status: "rebotado", sentAt: "2026-05-02T10:15:07" },
  // March matching emails
  { id: "e9",  period: "2026-03", donorId: "d1", donorName: "Camila Torres",    donorEmail: "camila.torres@gmail.com",  subject: "Camila, este mes escuchaste a 2 personas",    status: "abierto",  sentAt: "2026-04-01T09:10:00", openedAt: "2026-04-01T10:00:00" },
  { id: "e10", period: "2026-03", donorId: "d2", donorName: "Felipe Morales",   donorEmail: "f.morales@outlook.com",    subject: "Felipe, este mes escuchaste a 1 persona",     status: "enviado",  sentAt: "2026-04-01T09:10:01" },
  { id: "e11", period: "2026-03", donorId: "d3", donorName: "Valentina Ruiz",   donorEmail: "vale.ruiz@gmail.com",      subject: "Valentina, este mes escuchaste a 3 personas",  status: "abierto",  sentAt: "2026-04-01T09:10:02", openedAt: "2026-04-01T11:30:00" },
  { id: "e12", period: "2026-03", donorId: "d4", donorName: "Diego Sánchez",    donorEmail: "diego.sanchez@empresa.cl", subject: "Diego, este mes escuchaste a 2 personas",     status: "abierto",  sentAt: "2026-04-01T09:10:03", openedAt: "2026-04-02T08:15:00" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export const ACTIVE_DONORS = DONORS.filter(d => d.status === "activo");

export const MRR = ACTIVE_DONORS.reduce((sum, d) => sum + d.amount, 0);

export const TOTAL_SPACES_ACTIVE = ACTIVE_DONORS.reduce((sum, d) => sum + d.spaces, 0);

export function getParticipantsForPeriod(period: string) {
  return PARTICIPANTS.filter(p => p.period === period);
}

export function getMatchesForPeriod(period: string) {
  return MATCHES.filter(m => m.period === period);
}

export function getDonorById(id: string) {
  return DONORS.find(d => d.id === id);
}

export function getParticipantById(id: string) {
  return PARTICIPANTS.find(p => p.id === id);
}

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}

export function formatPeriod(period: string): string {
  const [year, month] = period.split("-");
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });
}
