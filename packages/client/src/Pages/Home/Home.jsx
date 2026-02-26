import "../../assets/CSS/ExGame.css";
import GameScore from "../../Components/GameScore";
import ListItemGame from "../../Components/ListItemGame";
import ListDice from "../../Components/ListDice";
import Toast from "../../Components/Toast";

const Home = () => {
  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6" id="exGame">
      <Toast />
      <div className="mx-auto max-w-6xl">
        <GameScore />

        {/* Mobile: dice trước, betting sau. Desktop: betting trái, dice phải */}
        <div className="mt-3 sm:mt-4 flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <ListItemGame />
          </div>
          <div className="flex justify-center md:shrink-0">
            <ListDice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
