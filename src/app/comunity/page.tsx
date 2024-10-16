import { Metadata } from 'next';
import CommentPost from './_components/CommentPost';

export const metadata: Metadata = {
  title: '커뮤니티 페이지',
  description: '챌린지 목록과 댓글을 확인 할 수 있습니다',
};

export default function Comunity() {
  return (
    <div className="pt-[64px] px-[40px]">
      <CommentPost />
    </div>
  );
}
