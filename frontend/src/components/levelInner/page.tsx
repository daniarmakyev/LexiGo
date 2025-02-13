"use client";
import { encodeId } from "@/scripts/decoder";
import { UseComparison } from "@/scripts/UseComparison";
import { UseRandom } from "@/scripts/UseRandom";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, Word } from "../../../helpers/types";
import { updateCurrentUser } from "../../../store/Users/Users.action";
import style from "../../app/mainPage.module.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface LevelInnerProps {
  progressBar: number;
  setProgress: (progress: number) => void;
  setHeart: (heart: number) => void;
  currentUser: any;
  level: string;
  heart: number;
  words: Word[];
}

const LevelInner: React.FC<LevelInnerProps> = ({
  words,
  progressBar,
  setProgress,
  setHeart,
  heart,
  currentUser,
  level,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<string | null>(
    null
  );
  const [hoveredWordId, setHoveredWordId] = useState<number | null>(null);
  const [randomedWords, setRandomedWords] = useState<Word[]>([]);
  const [activeWordId, setActiveWordId] = useState<number | null>(null);
  const [trueComparison, setTrueComparison] = useState<number[]>([]);
  const [userComparison, setUserComparison] = useState<number[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();


  const wordIdsByProgress: { [key: number]: number[] } = {
    0: [1],
    15: [1, 3],
    30: [2, 3],
    45: [1],
    60: [1, 2],
    75: [3],
    95: [2],
    100: [1],
  };

  const handelCompare = async () => {
    console.log(userComparison + "dada");
    console.log(trueComparison + "ouou");

    if (UseComparison(userComparison, trueComparison)) {
      const newProgress = (() => {
        switch (progressBar) {
          case 0:
            return 15;
          case 15:
            return 30;
          case 30:
            return 45;
          case 45:
            return 60;
          case 60:
            return 75;
          case 75:
            return 95;
          case 95:
            return 100;
          default:
            return progressBar;
        }
      })();
      const codedProgress = encodeId(newProgress);
      setProgress(newProgress);
      router.push(`/level/${level}/${codedProgress}`);
    } else {
      const updatedHeart = heart - 1; // Уменьшаем на 1
      setHeart(updatedHeart); // Устанавливаем новое значение
      dispatch(updateCurrentUser({ lives: updatedHeart }));
      localStorage.setItem("lives", updatedHeart.toString());

      if (updatedHeart <= 0) {
        console.log("У пользователя закончились жизни");
      }
    }
  };

  const getTranslation = (item: Word) => {
    switch (currentUser?.lang) {
      case "ru":
        return item.translationRu;
      case "en":
        return item.translationEn;
      case "hi":
        return item.translationHi;
      default:
        return item.translationEn;
    }
  };

  const handleWordClick = (word: Word) => {
    setUserComparison((prev) =>
      prev.includes(word.wordId)
        ? prev.filter((id) => id !== word.wordId)
        : [...new Set([...prev, word.wordId])]
    );
  };

  const handleWordClickHover = (word: Word) => {
    if (activeWordId === word.wordId) {
      setActiveWordId(null);
    } else {
      setActiveWordId(word.wordId);
    }
  };

  const handleMouseEnter = (word: Word) => {
    setCurrentTranslation(getTranslation(word));
    setIsHovered(true);
    setHoveredWordId(word.wordId);
  };
  const handleMouseLeave = () => {
    setHoveredWordId(null);
    setIsHovered(false);
    setCurrentTranslation(null);
  };

  useEffect(() => {
    if (words) {
      console.log(words);
    }
    console.log(words);
  }, []);
  useEffect(() => {
    if (words && words.length > 0) {
      console.log(progressBar);

      setTrueComparison(wordIdsByProgress[progressBar]);
      setRandomedWords(UseRandom(words));
    }
  }, [progressBar]);
  return (
    <>
      {words && (
        <div className="flex gap-5 mt-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 94 73"
            width="24"
            height="23"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "100%",
              transform: "translate3d(0px, 0px, 0px)",
              contentVisibility: "visible",
            }}
          >
            <g clipPath="url(#__lottie_element_1934)">
              <g
                clipPath="url(#__lottie_element_1936)"
                transform="matrix(0.26499998569488525,0,0,0.26499998569488525,-84.5,-101.53498840332031)"
                opacity="1"
              >
                <g
                  transform="matrix(1.3600000143051147,0,0,1.3600000143051147,516.219970703125,522.4000244140625)"
                  opacity="0.9069389991639046"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    className="animated-speaker-icon-lottie"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="22.485592375331898"
                    d=" M48.88100051879883,-88.13400268554688 C79.822998046875,-70.9219970703125 100.77899932861328,-37.88800048828125 100.77899932861328,0 C100.77899932861328,37.9109992980957 79.7979965209961,70.96199798583984 48.82500076293945,88.16500091552734"
                  />
                </g>
                <g
                  transform="matrix(1.3600000143051147,0,0,1.3600000143051147,516.219970703125,522.4000244140625)"
                  opacity="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    className="animated-speaker-icon-lottie"
                    stroke="rgb(255,255,255)"
                    strokeOpacity="1"
                    strokeWidth="20.500305987715482"
                    d=" M24.131000518798828,-42.808998107910156 C39.055999755859375,-34.37099838256836 49.14099884033203,-18.354000091552734 49.14099884033203,0 C49.14099884033203,18.386999130249023 39.02000045776367,34.42900085449219 24.049999237060547,42.854000091552734"
                  />
                </g>
                <g
                  clipPath="url(#__lottie_element_1941)"
                  transform="matrix(1.0370399951934814,0,0,0.9629600048065186,136.53640747070312,163.66775512695312)"
                  opacity="1"
                >
                  <g
                    transform="matrix(1,0,0,1,260.93701171875,373.6780090332031)"
                    opacity="1"
                  >
                    <g opacity="1" transform="matrix(6,0,0,6,0,0)">
                      <path
                        className="animated-speaker-icon-lottie"
                        fill="rgb(255,255,255)"
                        fillOpacity="1"
                        d=" M-8.293000221252441,-11.675000190734863 C-8.293000221252441,-11.675000190734863 -0.12300000339746475,-11.675000190734863 -0.12300000339746475,-11.675000190734863 C2.9070000648498535,-11.675000190734863 5.367000102996826,-9.21500015258789 5.367000102996826,-6.184999942779541 C5.367000102996826,-6.184999942779541 5.367000102996826,6.425000190734863 5.367000102996826,6.425000190734863 C5.367000102996826,9.454999923706055 2.9070000648498535,11.914999961853027 -0.12300000339746475,11.914999961853027 C-0.12300000339746475,11.914999961853027 -8.293000221252441,11.914999961853027 -8.293000221252441,11.914999961853027 C-11.322999954223633,11.914999961853027 -13.782999992370605,9.454999923706055 -13.782999992370605,6.425000190734863 C-13.782999992370605,6.425000190734863 -13.782999992370605,-6.184999942779541 -13.782999992370605,-6.184999942779541 C-13.782999992370605,-9.21500015258789 -11.322999954223633,-11.675000190734863 -8.293000221252441,-11.675000190734863z M-4.980999946594238,-11.656999588012695 C-4.980999946594238,-11.656999588012695 10.218999862670898,-22.32699966430664 10.218999862670898,-22.32699966430664 C11.24899959564209,-23.047000885009766 12.659000396728516,-22.797000885009766 13.3690000000000,-21.777000427246094 C13.638999938964844,-21.39699935913086 13.779000282287598,-20.937000274658203 13.779000282287598,-20.476999282836914 C13.779000282287598,-20.476999282836914 13.779000282287598,20.472999572753906 13.779000282287598,20.472999572753906 C13.779000282287598,21.722999572753906 12.769000053405762,22.732999801635742 11.519000053405762,22.732999801635742 C11.059000015258789,22.732999801635742 10.609000205993652,22.593000411987305 10.218999862670898,22.322999954223633 C10.218999862670898,22.322999954223633 -4.980999946594238,11.652999877929688 -4.980999946594238,11.652999877929688 C-5.580999851226807,11.232999801635742 -5.940999984741211,10.543000221252441 -5.940999984741211,9.803000450134277 C-5.940999984741211,9.803000450134277 -5.940999984741211,-9.807000160217285 -5.940999984741211,-9.807000160217285 C-5.940999984741211,-10.536999702453613 -5.580999851226807,-11.22700023651123 -4.980999946594238,-11.656999588012695z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          {progressBar in wordIdsByProgress && words && words.length > 0 && (
            <div className="flex gap-5 mt-auto relative">
              {words.filter((word) => trueComparison.includes(word.wordId)).map((word) => (
                <div className="relative" key={word.id}>
                  <span
                    className={` cursor-pointer select-none underline decoration-dotted decoration-4 ${style.skipUnderLine}`}
                    onMouseEnter={() => handleMouseEnter(word)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleWordClickHover(word)}
                  >
                    {word.word}
                  </span>
                  {activeWordId === word.wordId &&
                    hoveredWordId === word.wordId &&
                    currentTranslation && (
                      <div className="absolute -bottom-9 left-0 text-base text-neutral-400 rounded shadow">
                        {currentTranslation}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex gap-3 flex-wrap max-w-96 items-center justify-center mt-40">
        {randomedWords.map((item) => (
          <p
            className={`cursor-pointer p-2 border-neutral-700 border-solid border-2 rounded-md transition-colors select-none ${
              userComparison.includes(item.wordId)
                ? "bg-[#DC2219] text-white"
                : "bg-[#121f25] text-white"
            }`}
            key={item.id}
            onClick={() => handleWordClick(item)}
          >
            {getTranslation(item)}
          </p>
        ))}
      </div>
      <button onClick={handelCompare} className="mt-auto mb-24">
        <span className="cursor-pointer">{t("check")}</span>
      </button>
    </>
  );
};

export default LevelInner;
