// Valores fijos para los filtros y formularios
// Estos valores pueden ajustarse según las necesidades del negocio

export const ESTATUS_OPTIONS = [
  "Activo",
  "Inactivo",
  "Pendiente",
  "Suspendido",
] as const;

export const RANGO_OPTIONS = [
  "Oro",
  "Plata",
  "Bronce",
  "Novato",
] as const;

export const CARGO_OPTIONS = [
  "Presidente",
  "Vicepresidente",
  "Secretario",
  "Tesorero",
  "Miembro",
] as const;

export const RH_OPTIONS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

// Tipos derivados de las constantes
export type Estatus = typeof ESTATUS_OPTIONS[number];
export type Rango = typeof RANGO_OPTIONS[number];
export type Cargo = typeof CARGO_OPTIONS[number];
export type RH = typeof RH_OPTIONS[number];

