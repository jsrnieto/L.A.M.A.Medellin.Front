import { Box, Paper, Typography, Alert } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
];

/**
 * Componente para gráfico de torta
 */
export function PieChartComponent({ title, data }: { title: string; data: ChartData[] }) {
  if (!data || data.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "1px solid rgba(0, 120, 212, 0.15)",
          background:
            "linear-gradient(135deg, rgba(0, 120, 212, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)",
          height: "480px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#333", mb: 2 }}>
          {title}
        </Typography>
        <Alert severity="info">No hay datos disponibles</Alert>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid rgba(0, 120, 212, 0.15)",
        background:
          "linear-gradient(135deg, rgba(0, 120, 212, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)",
        height: "480px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#333", mb: 2 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent = 0 }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}



/**
 * Componente para gráfico de barras
 */
export function BarChartComponent({
  title,
  data,
  color = "#8884d8",
}: {
  title: string;
  data: ChartData[];
  color?: string;
}) {
  if (!data || data.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "1px solid rgba(0, 120, 212, 0.15)",
          background:
            "linear-gradient(135deg, rgba(0, 120, 212, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)",
          height: "480px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#333", mb: 2 }}>
          {title}
        </Typography>
        <Alert severity="info">No hay datos disponibles</Alert>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid rgba(0, 120, 212, 0.15)",
        background:
          "linear-gradient(135deg, rgba(0, 120, 212, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%)",
        height: "480px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#333", mb: 2 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

