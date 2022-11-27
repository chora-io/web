import * as React from "react";
import { useState, useEffect } from "react";
import { formatTimestamp } from "../utils/timestamp";

import Main from "../layouts/Main"
import Seo from "../components/Seo"
import Background from "../components/Background"

import * as styles from "./index.module.css"

const choraTestnetUrl = "https://testnet.chora.io/rest"
const regenRedwoodUrl = "https://redwood.chora.io/rest"
const regenHambachUrl = "https://hambach.chora.io/rest"

const tendermintBlocksLatest = "/cosmos/base/tendermint/v1beta1/blocks/latest"

const Index = () => {
  const [choraTestnetChainId, setChoraTestnetChainId] = useState<string>("");
  const [choraTestnetHeight, setChoraTestnetHeight] = useState<number>(0);
  const [choraTestnetTimestamp, setChoraTestnetTimestamp] = useState<string>("");
  const [choraTestnetError, setChoraTestnetError] = useState<string>("");

  const [regenRedwoodChainId, setRegenRedwoodChainId] = useState<string>("");
  const [regenRedwoodHeight, setRegenRedwoodHeight] = useState<number>(0);
  const [regenRedwoodTimestamp, setRegenRedwoodTimestamp] = useState<string>("");
  const [regenRedwoodError, setRegenRedwoodError] = useState<string>("");

  const [regenHambachHeight, setRegenHambachHeight] = useState<number>(0);
  const [regenHambachChainId, setRegenHambachChainId] = useState<string>("");
  const [regenHambachTimestamp, setRegenHambachTimestamp] = useState<string>("");
  const [regenHambachError, setRegenHambachError] = useState<string>("");

  useEffect(() => {

    // fetch chora testnet block header data
    fetch(choraTestnetUrl + tendermintBlocksLatest)
      .then(res => res.json())
      .then(data => {
        setChoraTestnetChainId(data.block.header.chain_id);
        setChoraTestnetHeight(data.block.header.height);
        setChoraTestnetTimestamp(formatTimestamp(data.block.header.time));
      })
      .catch(err => {
        setChoraTestnetError(err.message);
      });

    // fetch regen redwood block header data
    fetch(regenRedwoodUrl + tendermintBlocksLatest)
      .then(res => res.json())
      .then(data => {
        setRegenRedwoodChainId(data.block.header.chain_id);
        setRegenRedwoodHeight(data.block.header.height);
        setRegenRedwoodTimestamp(formatTimestamp(data.block.header.time));
      })
      .catch(err => {
        setRegenRedwoodError(err.message);
      });

    // fetch chora testnet block header data
    fetch(regenHambachUrl + tendermintBlocksLatest)
      .then(res => res.json())
      .then(data => {
        setRegenHambachChainId(data.block.header.chain_id);
        setRegenHambachHeight(data.block.header.height);
        setRegenHambachTimestamp(formatTimestamp(data.block.header.time));
      })
      .catch(err => {
        setRegenHambachError(err.message);
      });
   }, []);

  return (
    <Main>
      <Background />
      <div className={styles.container} >
        <div className={styles.content}>
          {choraTestnetError == "" ? (
            <div>
              <h3>
                {choraTestnetChainId}
              </h3>
              <p>
                <i>
                  {choraTestnetTimestamp}
                </i>
              </p>
              <p>
                {choraTestnetHeight}
              </p>
            </div>
          ): (
            <div>
              <p className={styles.error}>
                {choraTestnetError}
              </p>
              <p className={styles.error}>
                {choraTestnetUrl}
              </p>
            </div>
          )}
          {regenRedwoodError == "" ? (
            <div>
              <h3>
                {regenRedwoodChainId}
              </h3>
              <p>
                <i>
                  {regenRedwoodTimestamp}
                </i>
              </p>
              <p>
                {regenRedwoodHeight}
              </p>
            </div>
          ): (
            <div>
              <p className={styles.error}>
                {regenRedwoodError}
              </p>
              <p className={styles.error}>
                {regenRedwoodUrl}
              </p>
            </div>
          )}
          {regenHambachError == "" ? (
            <div>
              <h3>
                {regenHambachChainId}
              </h3>
              <p>
                <i>
                  {regenHambachTimestamp}
                </i>
              </p>
              <p>
                {regenHambachHeight}
              </p>
            </div>
          ): (
            <div>
              <p className={styles.error}>
                {regenHambachError}
              </p>
              <p className={styles.error}>
                {regenHambachUrl}
              </p>
            </div>
          )}
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Index
