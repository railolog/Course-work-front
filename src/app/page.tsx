"use client"

import styles from "./page.module.css";
import React, {useState} from "react";
import Image from "next/image";
import mainImage from '@/images/charmeleon.png';
import secondaryImage from '@/images/absol.png';
import { RightArrowIcon } from "@/icons/index";
import {FightCard} from "@/components/FightCard";
import {useAuth} from "@/context/auth";
import {AuthModal} from "@/components/modals/AuthModal";
import {useFights} from "@/context/fight";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const { fights } = useFights();

    const [showModal, setShowModal] = useState<boolean>(false);

    const emptySubtitle = isAuthenticated ? "Здесь будут отображаться проведенные бои, время начать сражаться!" : "Здесь будут отображаться проведенные бои, зарегистрируйтесь или войти, чтобы начать";

    return (
      <>
          <div className={styles.container}>
              <div className={styles.banner}>
                  <div className={styles.textContainer}>
                      <div className={styles.title}>
                          Получи свой шанс провести бой и стать <span className={styles.highlight}>победителем</span>
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
                      <Image className={styles.mainImage} src={mainImage} alt="Pokemons" width={undefined}
                             height={400}/>
                      <Image className={styles.secondaryImage} src={secondaryImage} alt="Pokemons" width={undefined}
                             height={400}/>
                  </div>
              </div>
              {isAuthenticated && fights.length ? (
                  <div className={styles.fightsContainer}>
                      <div className={styles.fightsTitle}>Мои бои</div>
                      <div className={styles.fights}>
                          {fights.map((fight) => (
                              <FightCard fight={fight} key={fight.id}/>
                          ))}
                      </div>
                  </div>
              ) : (
                  <div className={styles.emptyContainer}>
                      <p className={styles.emptyTitle}>Начните проводить бои прямо сейчас!</p>
                      <p className={styles.emptyText}>{emptySubtitle}</p>
                      {!isAuthenticated && <button className={styles.button} onClick={() => setShowModal(true)}>Войти</button>}
                  </div>
              )}
          </div>
          {showModal && <AuthModal onClose={() => setShowModal(false)}/>}
      </>
    );
}
