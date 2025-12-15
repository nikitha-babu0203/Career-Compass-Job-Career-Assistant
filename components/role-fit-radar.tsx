"use client"

import { useMemo } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

interface RoleFitRadarProps {
  skillsFit: number
  experienceFit: number
  toolsFit: number
  domainFit: number
  communicationFit: number
}

export function RoleFitRadar({ skillsFit, experienceFit, toolsFit, domainFit, communicationFit }: RoleFitRadarProps) {
  const data = useMemo(
    () => [
      { dimension: "Skills", value: skillsFit, fullMark: 100 },
      { dimension: "Experience", value: experienceFit, fullMark: 100 },
      { dimension: "Tools/Tech", value: toolsFit, fullMark: 100 },
      { dimension: "Domain", value: domainFit, fullMark: 100 },
      { dimension: "Communication", value: communicationFit, fullMark: 100 },
    ],
    [skillsFit, experienceFit, toolsFit, domainFit, communicationFit],
  )

  // Compute colors in JS since CSS vars don't work in Recharts
  const primaryColor = "#0d9488"
  const primaryColorLight = "rgba(13, 148, 136, 0.3)"

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <Radar name="Role Fit" dataKey="value" stroke={primaryColor} fill={primaryColorLight} strokeWidth={2} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value}%`, "Score"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
