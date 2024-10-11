'use client';
import { useRouter } from 'next/navigation';
import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
} from 'react-calendar-heatmap';

const Heatmap = () => {
  const today = new Date();
  const { push } = useRouter();

  //sample date
  const data = [
    { date: '2024-01-01', count: 1 },
    { date: '2024-01-02', count: 1 },
    { date: '2024-01-03', count: 0 },
    { date: '2024-01-04', count: 3 },
    { date: '2024-01-05', count: 2 },
    { date: '2024-01-06', count: 1 },
    { date: '2024-01-07', count: 3 },
    { date: '2024-10-8', count: 2 },
    { date: '2024-10-9', count: 2 },
    { date: '2024-10-10', count: 2 },
    { date: '2024-10-11', count: 3 },
  ];
  const handleMouseOver = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.currentTarget.style.cursor = 'pointer';
  };

  return (
    <div className="w-2/3 mx-auto p-5">
      <CalendarHeatmap
        startDate={new Date('2024-01-01')}
        endDate={today}
        values={data}
        showWeekdayLabels={true}
        onMouseOver={(e) => handleMouseOver(e)}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'; // 데이터가 없을 때
          }
          return `color-scale-${value.count}`; // 데이터에 맞는 클래스 반환
        }}
        tooltipDataAttrs={(value: { date: string; count: number }) => ({
          'data-tip': `${value.date}: ${value.count}`,
        })}
        onClick={(value) =>
          alert(`Clicked on ${value?.date} with count ${value?.count}`)
        }
      />
    </div>
  );
};

export default Heatmap;
