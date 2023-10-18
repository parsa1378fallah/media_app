import Share from "../share/Share.jsx";
import Post from "../post/post.jsx";
import { useSelector } from "react-redux";
import { postsStore } from "../../store/posts/posts.js";
import { useParams } from "react-router-dom";
import {
  postsProfileStore,
  firstNameProfileStore,
  lastNameProfileStore,
  profilePhotoStore,
  userNameProfileStore,
  userIdProfileStore,
} from "../../store/profileUserInformation/index.js";
export default function feed({ classes }) {
  const posts = useSelector(postsStore);

  const postsOfPerofile = useSelector(postsProfileStore);
  const firstNameProfile = useSelector(firstNameProfileStore);
  const lastNameProfile = useSelector(lastNameProfileStore);
  const profilePhoto = useSelector(profilePhotoStore);
  const userNameProfile = useSelector(userNameProfileStore);
  const userIdProfile = useSelector(userIdProfileStore);
  const authorForProfile = {
    firstName: firstNameProfile,
    lastName: lastNameProfile,
    profile: profilePhoto,
    userName: userNameProfile,
    _id: userIdProfile,
  };

  const { userName } = useParams();

  const combinedClass = `p-4 z-10 ${classes}`;
  const shareIcons = [
    { icon: "PermMedia", value: "خوراکی" },
    { icon: "Label", value: "گفتگو ها" },
    { icon: "Room", value: "ویدئو ها" },
    { icon: "EmojiEmotions", value: "گروه ها" },
  ];

  return (
    <div className={combinedClass}>
      <Share icons={shareIcons} />
      {userName
        ? postsOfPerofile.map((item, index) => (
            <div key={item._id}>
              <Post
                postId={item._id}
                title={item.title}
                description={item.description}
                author={authorForProfile}
                likes={item.likedBy}
                comments={item.comments}
              />
            </div>
          ))
        : posts.map((item, index) => (
            <div key={item._id}>
              <Post
                postId={item._id}
                title={item.title}
                description={item.description}
                author={item.author}
                likes={item.likedBy}
                comments={item.comments}
              />
            </div>
          ))}
    </div>
  );
}
