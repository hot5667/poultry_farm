import Post from './_components/Post';

export default function Comunity() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return (
    <div className="pt-[64px]">
      <Post />
    </div>
  );
}
