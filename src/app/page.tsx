"use client"

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import {Fight, FightsMock} from "@/types/fights";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import mainImage from '@/images/charmeleon.png';
import secondaryImage from '@/images/absol.png';
import { RightArrowIcon } from "@/icons/index";
import {FightCard} from "@/components/FightCard";

export default function Home() {
  const [fights, setFights] = useState<Fight[]>(FightsMock);

  // useEffect(() => {
  //     const fetchFightsAndBalance = async () => {
  //         try {
  //             const fightsResponse = await axios.get('http://localhost:6969/fights');
  //             setFights(fightsResponse.data.fights);
  //             const userBalanceResponse = await axios.get(`http://localhost:6969/user/balance`);
  //             setUserBalance(userBalanceResponse.data.balance);
  //         } catch (error) {
  //             console.error('Ошибка при получении данных:', error);
  //         }
  //     }
  //
  //     fetchFightsAndBalance();
  // }, []);

  return (
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              Получи свой шанс провести бой и стать победителем
            </div>
            <div className={styles.subtitle}>
              Это возможность выиграть 500 000 рублей
            </div>
            <button className={styles.button}>
                Играть
                <RightArrowIcon className={styles.icon}/>
            </button>
          </div>
            <div className={styles.images}>
                <Image className={styles.mainImage} src={mainImage} alt="Pokemons" width={undefined} height={450}/>
                <Image className={styles.secondaryImage} src={secondaryImage} alt="Pokemons" width={undefined} height={450}/>
            </div>
        </div>
        {/*<Link href="/create-fight">Создать бой</Link>*/}
        {/*<Link href="/top-up">Пополнить баланс</Link>*/}
        <div className={styles.fights}>
            {fights.map((fight) => (
                <FightCard fight={fight} />
            ))}
        </div>
      </div>
  );
}
