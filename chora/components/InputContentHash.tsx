import * as React from "react"
import { useEffect, useState } from "react"
import { Buffer } from "buffer"

import InputHash from "./InputHash"
import SelectDataType from "./SelectDataType"
import SelectDigestAlgorithm from "./SelectDigestAlgorithm"
import SelectGraphCanon from "./SelectGraphCanon"
import SelectGraphMerkle from "./SelectGraphMerkle"
import SelectRawMedia from "./SelectRawMedia"

const defaultId = "content-hash"

const InputContentHash = ({ id, onlyGraph, setContentHash }: any) => {

  const [type, setType] = useState<string>("graph")
  const [hash, setHash] = useState<string>("")
  const [media, setMedia] = useState<string>("")

  useEffect(() => {
    setContentHash(undefined)
  }, [type])

  useEffect(() => {

    let ch: any

    if (type === "graph") {
      ch = {
        $type: "regen.data.v1.ContentHash",
        graph: {
          $type: "regen.data.v1.ContentHash.Graph",
          hash: Buffer.from(hash, "base64"),
          digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
          canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
          merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
        },
      }
    }

    if (type === "raw") {
      ch = {
        $type: "regen.data.v1.ContentHash",
        raw: {
          $type: "regen.data.v1.ContentHash.Raw",
          hash: Buffer.from(hash, "base64"),
          digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
          mediaType: media,
        },
      }
    }

    if (onlyGraph) {
      ch = ch.graph
    }

    setContentHash(ch)

  }, [hash, media])

  return (
    <>
      <InputHash
        id={(id || defaultId) + "-digest-algorithm"}
        hash={hash}
        setHash={setHash}
      />
      <SelectDigestAlgorithm
        id={(id || defaultId) + "-digest-algorithm"}
        digest={""} // disabled until multiple options exist
        setDigest={() => {}} // disabled until multiple options exist
      />
      {!onlyGraph && (
        <SelectDataType
          id={(id || defaultId) + "-data-type"}
          type={type}
          setType={setType}
        />
      )}
      {type == "graph" ? (
        <>
          <SelectGraphCanon
            id={(id || defaultId) + "-graph-canon"}
            canon={""} // disabled until multiple options exist
            setCanon={() => {}} // disabled until multiple options exist
          />
          <SelectGraphMerkle
            id={(id || defaultId) + "-graph-merkle"}
            canon={""} // disabled until multiple options exist
            setCanon={() => {}} // disabled until multiple options exist
          />
        </>
      ) : (
        <SelectRawMedia
          id={(id || defaultId) + "-raw-media"}
          media={media}
          setMedia={setMedia}
        />
      )}
    </>
  )
}

export default InputContentHash
