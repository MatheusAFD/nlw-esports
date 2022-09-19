import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdBanner } from "./components/CreateAdBanner";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdMobal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((item) => {
          return (
            <GameBanner
              key={item.id}
              bannerUrl={item.bannerUrl}
              title={item.title}
              adsCount={item._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdMobal />
      </Dialog.Root>
    </div>
  );
}

export default App;
