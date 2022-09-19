import { Input } from "./Form/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

import classNames from "classnames";

interface Game {
  id: string;
  title: string;
}

export function CreateAdMobal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, SetUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) return;

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hoursStart: data.hourStart,
        hoursEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anúncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl text-white font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
              defaultValue={"DEFAULT"}
            >
              <option disabled selected value={"DEFAULT"}>
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("0") === true,
                  })}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("1") === true,
                  })}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("2") === true,
                  })}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("3") === true,
                  })}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("4") === true,
                  })}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("5") === true,
                  })}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={classNames("w-8 h-8 rounded bg-zinc-900", {
                    "!bg-violet-500": weekDays.includes("6") === true,
                  })}
                  title="Sabádo"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) SetUseVoiceChannel(true);
                else SetUseVoiceChannel(false);
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md text-semibold hover:bg-zinc-500">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md text-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
