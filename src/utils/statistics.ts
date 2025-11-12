import type { Member } from "../types/data";
import dayjs from "dayjs";

/**
 * Funciones de utilidad para calcular estadísticas de miembros
 * 
 * Explicación:
 * - Todas las funciones reciben un array de miembros
 * - Calculan las estadísticas en el frontend
 * - Usan dayjs para manejar fechas
 */

/**
 * Calcula la proporción de miembros por cargo
 * Retorna un array con { name: cargo, value: cantidad }
 */
export const getMembersByCargo = (members: Member[]): Array<{ name: string; value: number }> => {
  const cargoCount: Record<string, number> = {};

  members.forEach((member) => {
    const cargo = member.cargo || "Sin cargo";
    cargoCount[cargo] = (cargoCount[cargo] || 0) + 1;
  });

  return Object.entries(cargoCount).map(([name, value]) => ({ name, value }));
};

/**
 * Calcula la proporción de miembros por rango
 * Retorna un array con { name: rango, value: cantidad }
 */
export const getMembersByRango = (members: Member[]): Array<{ name: string; value: number }> => {
  const rangoCount: Record<string, number> = {};

  members.forEach((member) => {
    const rango = member.rango || "Sin rango";
    rangoCount[rango] = (rangoCount[rango] || 0) + 1;
  });

  return Object.entries(rangoCount).map(([name, value]) => ({ name, value }));
};

/**
 * Calcula la cantidad de miembros por estatus
 * Retorna un array con { name: estatus, value: cantidad }
 */
export const getMembersByEstatus = (members: Member[]): Array<{ name: string; value: number }> => {
  const estatusCount: Record<string, number> = {};

  members.forEach((member) => {
    const estatus = member.estatus || "Sin estatus";
    estatusCount[estatus] = (estatusCount[estatus] || 0) + 1;
  });

  return Object.entries(estatusCount).map(([name, value]) => ({ name, value }));
};

/**
 * Calcula la cantidad total de miembros
 */
export const getTotalMembers = (members: Member[]): number => {
  return members.length;
};

/**
 * Calcula la cantidad de miembros nuevos (fecha de creación de hace 1 mes o superior)
 * Un miembro es "nuevo" si su fecha de ingreso es menor o igual a 1 mes desde hoy
 */
export const getNewMembers = (members: Member[]): number => {
  const oneMonthAgo = dayjs().subtract(1, "month");
  
  return members.filter((member) => {
    if (!member.fechaIngreso) return false;
    const fechaIngreso = dayjs(member.fechaIngreso);
    return fechaIngreso.isAfter(oneMonthAgo) || fechaIngreso.isSame(oneMonthAgo, "day");
  }).length;
};

/**
 * Calcula la cantidad de miembros longevos (más de un año en la organización)
 */
export const getLongevosMembers = (members: Member[]): number => {
  const oneYearAgo = dayjs().subtract(1, "year");
  
  return members.filter((member) => {
    if (!member.fechaIngreso) return false;
    const fechaIngreso = dayjs(member.fechaIngreso);
    return fechaIngreso.isBefore(oneYearAgo) || fechaIngreso.isSame(oneYearAgo, "day");
  }).length;
};

/**
 * Obtiene los miembros que se les está por vencer el SOAT
 * El SOAT dura 1 año en Colombia
 * Retorna miembros cuyo SOAT vence en los próximos 30 días
 */
export const getMembersWithSOATExpiring = (members: Member[]): Member[] => {
  const today = dayjs();
  const thirtyDaysFromNow = dayjs().add(30, "days");

  return members.filter((member) => {
    if (!member.fechaExpedicionSOAT) return false;
    
    const fechaExpedicion = dayjs(member.fechaExpedicionSOAT);
    const fechaVencimiento = fechaExpedicion.add(1, "year"); // SOAT dura 1 año
    
    // Verificar si vence en los próximos 30 días
    return fechaVencimiento.isAfter(today) && fechaVencimiento.isBefore(thirtyDaysFromNow) || 
           fechaVencimiento.isSame(today, "day") || 
           fechaVencimiento.isSame(thirtyDaysFromNow, "day");
  });
};

/**
 * Obtiene los miembros que se les está por vencer la licencia
 * La licencia dura 10 años en Colombia
 * Retorna miembros cuya licencia vence en los próximos 30 días
 */
export const getMembersWithLicenseExpiring = (members: Member[]): Member[] => {
  const today = dayjs();
  const thirtyDaysFromNow = dayjs().add(30, "days");

  return members.filter((member) => {
    if (!member.fechaExpedicionLicenciaConduccion) return false;
    
    const fechaExpedicion = dayjs(member.fechaExpedicionLicenciaConduccion);
    const fechaVencimiento = fechaExpedicion.add(10, "years"); // Licencia dura 10 años
    
    // Verificar si vence en los próximos 30 días
    return fechaVencimiento.isAfter(today) && fechaVencimiento.isBefore(thirtyDaysFromNow) || 
           fechaVencimiento.isSame(today, "day") || 
           fechaVencimiento.isSame(thirtyDaysFromNow, "day");
  });
};

/**
 * Calcula la proporción de motos por cilindraje
 * Retorna un array con { name: rango de cilindraje, value: cantidad }
 */
export const getMotosByCilindraje = (members: Member[]): Array<{ name: string; value: number }> => {
  const cilindrajeRanges: Record<string, number> = {
    "0-150": 0,
    "151-250": 0,
    "251-500": 0,
    "501-750": 0,
    "751-1000": 0,
    "1000+": 0,
  };

  members.forEach((member) => {
    if (!member.cilindrajeCC) return;
    
    const cc = member.cilindrajeCC;
    if (cc <= 150) cilindrajeRanges["0-150"]++;
    else if (cc <= 250) cilindrajeRanges["151-250"]++;
    else if (cc <= 500) cilindrajeRanges["251-500"]++;
    else if (cc <= 750) cilindrajeRanges["501-750"]++;
    else if (cc <= 1000) cilindrajeRanges["751-1000"]++;
    else cilindrajeRanges["1000+"]++;
  });

  // Filtrar rangos con 0 miembros
  return Object.entries(cilindrajeRanges)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
};

/**
 * Obtiene los miembros próximos a cumplir años
 * Retorna miembros que cumplen años en los próximos 30 días
 */
export const getMembersWithBirthdayComing = (members: Member[]): Member[] => {
  const today = dayjs();
  const thirtyDaysFromNow = dayjs().add(30, "days");

  return members.filter((member) => {
    if (!member.fechaNacimiento) return false;
    
    const fechaNacimiento = dayjs(member.fechaNacimiento);
    const birthdayThisYear = dayjs().year(fechaNacimiento.year()).month(fechaNacimiento.month()).date(fechaNacimiento.date());
    
    // Si el cumpleaños ya pasó este año, usar el del próximo año
    const nextBirthday = birthdayThisYear.isBefore(today) 
      ? birthdayThisYear.add(1, "year")
      : birthdayThisYear;
    
    // Verificar si cumple años en los próximos 30 días
    return nextBirthday.isAfter(today) && nextBirthday.isBefore(thirtyDaysFromNow) || 
           nextBirthday.isSame(today, "day") || 
           nextBirthday.isSame(thirtyDaysFromNow, "day");
  });
};

