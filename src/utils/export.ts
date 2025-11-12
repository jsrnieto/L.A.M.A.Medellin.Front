import type { Member } from "../types/data";

/**
 * Convierte un array de miembros a formato CSV
 * 
 * Explicación:
 * - Crea una fila de encabezados con todos los campos
 * - Convierte cada miembro a una fila CSV
 * - Maneja valores nulos/undefined correctamente
 * - Escapa comillas y comas en los valores
 */
export const exportMembersToCSV = (members: Member[]): void => {
  if (members.length === 0) {
    alert("No hay miembros para exportar");
    return;
  }

  // Definir los encabezados (columnas)
  const headers = [
    "ID",
    "Nombre",
    "Apellido",
    "Celular",
    "Correo Electrónico",
    "Fecha Ingreso",
    "Dirección",
    "Número de Miembro",
    "Cargo",
    "Rango",
    "Estatus",
    "Fecha Nacimiento",
    "Cédula",
    "RH",
    "EPS",
    "Padrino",
    "Foto",
    "Contacto Emergencia",
    "Ciudad",
    "Moto",
    "Año Modelo",
    "Marca",
    "Cilindraje CC",
    "Placa Matrícula",
    "Fecha Expedición Licencia",
    "Fecha Expedición SOAT",
  ];

  /**
   * Escapa un valor para CSV (maneja comillas y comas)
   */
  const escapeCSV = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    // Si contiene comillas, comas o saltos de línea, envolver en comillas y escapar comillas internas
    if (stringValue.includes('"') || stringValue.includes(",") || stringValue.includes("\n")) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  /**
   * Convierte un miembro a una fila CSV
   */
  const memberToRow = (member: Member): string[] => {
    return [
      escapeCSV(member.id),
      escapeCSV(member.nombre),
      escapeCSV(member.apellido),
      escapeCSV(member.celular),
      escapeCSV(member.correoElectronico),
      escapeCSV(member.fechaIngreso),
      escapeCSV(member.direccion),
      escapeCSV(member.memberNumber),
      escapeCSV(member.cargo),
      escapeCSV(member.rango),
      escapeCSV(member.estatus),
      escapeCSV(member.fechaNacimiento),
      escapeCSV(member.cedula),
      escapeCSV(member.rh),
      escapeCSV(member.eps),
      escapeCSV(member.padrino),
      escapeCSV(member.foto),
      escapeCSV(member.contactoEmergencia),
      escapeCSV(member.ciudad),
      escapeCSV(member.moto),
      escapeCSV(member.anoModelo),
      escapeCSV(member.marca),
      escapeCSV(member.cilindrajeCC),
      escapeCSV(member.placaMatricula),
      escapeCSV(member.fechaExpedicionLicenciaConduccion),
      escapeCSV(member.fechaExpedicionSOAT),
    ];
  };

  // Crear el contenido CSV
  const csvContent = [
    headers.join(","), // Fila de encabezados
    ...members.map((member) => memberToRow(member).join(",")), // Filas de datos
  ].join("\n");

  // Crear un Blob con el contenido CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Crear un enlace temporal para descargar el archivo
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  // Configurar el enlace
  link.setAttribute("href", url);
  link.setAttribute("download", `miembros_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";

  // Agregar al DOM, hacer clic y remover
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Liberar la URL del objeto
  URL.revokeObjectURL(url);
};

