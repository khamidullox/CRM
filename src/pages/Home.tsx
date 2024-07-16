import CommentList from "../components/CommentList";
import { customFetch } from "../utils";

export let loader = async () => {
  let commentReq = await customFetch(`/comment/`);
  let comment = await commentReq.data;
  return { comment };
};

function Home() {
  return (
    <div className="aligen-content">
      <CommentList />
    </div>
  );
}

export default Home;
