import Link from 'next/link';

const MOCK_DATA = [
  {
    user_id: 1,
    username: 'challenge_master',
    challenge_name: '30-Day Fitness Challenge',
    progress: 80,
    start_date: '2024-09-01',
    end_date: '2024-09-30',
    current_day: 24,
    completed: false,
  },
  {
    user_id: 2,
    username: 'fit_lover',
    challenge_name: 'Healthy Eating Challenge',
    progress: 100,
    start_date: '2024-08-15',
    end_date: '2024-09-15',
    current_day: 30,
    completed: true,
  },
  {
    user_id: 3,
    username: 'goal_digger',
    challenge_name: 'Reading Challenge - 12 Books',
    progress: 50,
    start_date: '2024-10-01',
    end_date: '2024-12-31',
    current_day: 15,
    completed: false,
  },
  {
    user_id: 4,
    username: 'life_changer',
    challenge_name: '5K Running Challenge',
    progress: 60,
    start_date: '2024-09-20',
    end_date: '2024-10-20',
    current_day: 18,
    completed: false,
  },
];

export default function Comunity() {
  const data = MOCK_DATA;

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  console.log(month);

  return (
    <div>
      <h3>
        {month}월{day}일
      </h3>
      <div>
        {data.map((user) => (
          <div className="mb-[20px]" key={user.user_id}>
            <Link href={`/`}>
              <strong>{user.username}</strong>
              <p>{user.challenge_name}</p>
              <span>진행률: {user.progress}</span>
              <ul>
                <li>{user.start_date}</li>
                <li>{user.end_date}</li>
              </ul>
              <span>{user.current_day}</span>
              <strong>{user.completed}</strong>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
