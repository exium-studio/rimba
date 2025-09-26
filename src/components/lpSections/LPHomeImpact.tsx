"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { COLORS } from "@/constants/colors";
import { MONTHS } from "@/constants/months";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { BarList, BarListData, Chart, useChart } from "@chakra-ui/charts";
import { SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatItem = (props: any) => {
  // Props
  const { stats, ...restProps } = props;

  // Contexts
  const { lang } = useLang();

  return (
    <CContainer gap={4} {...restProps}>
      <EditableContentContainer content={stats.valueContent}>
        <P fontSize={"4xl"} fontWeight={"medium"}>
          {stats.valueContent?.content[lang]}
        </P>
      </EditableContentContainer>

      <EditableContentContainer content={stats.valueContent}>
        <P color={"fg.subtle"}>{stats.descriptionContent?.content[lang]}</P>
      </EditableContentContainer>
    </CContainer>
  );
};
const CompletionProgressChart = (props: StackProps) => {
  // Contexts
  const { lang } = useLang();
  const homeCompletionProgress = useContents((s) => s.homeCompletionProgress);
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // States
  const chart = useChart({
    data: homeCompletionProgress.map((progress: any, idx: number) => {
      return { ...progress, month: MONTHS[lang][idx].slice(0, iss ? 2 : 3) };
    }),
    series: Object.keys(homeCompletionProgress[0]).map((key, idx) => {
      return {
        name: key,
        color: COLORS[idx % COLORS.length],
      };
    }),
  });

  return (
    <CContainer gap={4} {...props}>
      <EditableContentContainer content={staticContents[47]}>
        <P fontSize={"lg"} fontWeight={"medium"}>
          {staticContents[47]?.content[lang]}
        </P>
      </EditableContentContainer>

      <Chart.Root maxH="sm" chart={chart} ml={"-24px"}>
        <LineChart data={chart.data}>
          <CartesianGrid stroke={chart.color("border")} vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={chart.key("month" as any)}
            tickFormatter={(value) => value.slice(0, 3)}
            stroke={chart.color("border")}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            dataKey={chart.key("2023")}
            stroke={chart.color("border")}
          />
          <Tooltip
            animationDuration={100}
            cursor={{ stroke: chart.color("border") }}
            content={<Chart.Tooltip />}
          />
          <Legend
            verticalAlign="top"
            align="right"
            content={<Chart.Legend />}
          />

          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              strokeWidth={2}
              stroke={chart.color(item.color)}
              dot={false}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </CContainer>
  );
};
const AnimalsChart = (props: StackProps) => {
  // Contexts
  const { lang } = useLang();
  const homeSpeciesComposition = useContents((s) => s.homeSpeciesComposition);
  const staticContents = useContents((s) => s.staticContents);

  // States
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: homeSpeciesComposition,
    series: [{ name: "name", color: "p.subtle" }],
  });

  return (
    <CContainer gap={4} {...props}>
      <EditableContentContainer content={staticContents[46]}>
        <P fontSize={"lg"} fontWeight={"medium"}>
          {staticContents[46]?.content[lang]}
        </P>
      </EditableContentContainer>

      <BarList.Root chart={chart}>
        <BarList.Content>
          <BarList.Bar />
          <BarList.Value />
        </BarList.Content>
      </BarList.Root>
    </CContainer>
  );
};

export const LPHomeImpact = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);
  const chartContentsRef = useRef<HTMLDivElement>(null);

  // States
  const statsList = [
    {
      valueContent: staticContents[38],
      descriptionContent: staticContents[39],
    },
    {
      valueContent: staticContents[40],
      descriptionContent: staticContents[41],
    },
    {
      valueContent: staticContents[42],
      descriptionContent: staticContents[43],
    },
    {
      valueContent: staticContents[44],
      descriptionContent: staticContents[45],
    },
  ];

  // Animation
  useGSAP(
    () => {
      gsap.from(".content_1", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_2", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".completion_chart", {
        scrollTrigger: {
          trigger: chartContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".animals_chart", {
        scrollTrigger: {
          trigger: chartContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <CContainer ref={containerRef} py={"80px"} {...restProps}>
      <LPSectionContainer gap={"80px"}>
        <SimpleGrid
          ref={mainContentsRef}
          columns={[1, null, 2]}
          gapX={"80px"}
          gapY={8}
        >
          <CContainer className="content_1">
            <EditableContentContainer content={staticContents[36]} mt={"-12px"}>
              <H2 fontWeight={"bold"} color={"p.700"}>
                {staticContents[36]?.content[lang]}
              </H2>
            </EditableContentContainer>
          </CContainer>

          <CContainer className="content_2" gap={"80px"}>
            <EditableContentContainer content={staticContents[37]}>
              <P fontSize={"lg"}>{staticContents[37]?.content[lang]}</P>
            </EditableContentContainer>

            <SimpleGrid columns={[1, null, 2]} gap={8}>
              {statsList.map((stats, idx) => {
                return <StatItem key={idx} stats={stats} />;
              })}
            </SimpleGrid>
          </CContainer>
        </SimpleGrid>

        <SimpleGrid
          ref={chartContentsRef}
          columns={[1, null, 2]}
          gapX={"80px"}
          gapY={8}
        >
          <CompletionProgressChart className="completion_chart" />

          <AnimalsChart className="animals_chart" />
        </SimpleGrid>
      </LPSectionContainer>
    </CContainer>
  );
};
