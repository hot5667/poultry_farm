import Post from './_components/Post';

export default function Comunity() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return (
    <div>
      <h3>
        {month}월{day}일
      </h3>
      <div>
        <Post />
      </div>
    </div>
  );
}
