import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  ModalHeader,
  Text,
  Image,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Frame from "../ui/Frame";

import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store";
import axios from "axios";

const CollectionModal = () => {
  const onOpen = useSelector((state: any) => state.modal.isCollection);
  const authState = useSelector((state: any) => state.auth.isLogged);
  const userId = useSelector((state: any) => state.render.userId);
  const dispatch = useDispatch();
  const isCollectionCounter = useSelector(
    (state: any) => state.render.isCollectionUpdate
  );

  const [data1, setData1] = useState([]);
  const [boughtImages, setBoughtImages] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="30%"
      backdropBlur="2px"
    />
  );

  const onToggle = () => {
    dispatch(modalActions.collectionToggle());
  };

  let c = 0;

  function base64ArrayBuffer(arrayBuffer: any) {
    var base64 = "";
    var encodings =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + "==";
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }

    return base64;
  }

  //api
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const func2 = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = await response.json();
        setBoughtImages(data.data.data.boughtImages);
      } catch (error) {
        console.log(error);
      }
    };
    func2();
  }, [backendUrl, isCollectionCounter, authState, userId]);

  const fetchPhotosByBoughtImages = async (boughtImages: any) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/photo/getBoughtPhotos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ boughtImages }), // Convert boughtImages to JSON
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();
      console.log(data);
      setData1(data.data.filteredPhotoModels);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (boughtImages.length > 0) {
      fetchPhotosByBoughtImages(boughtImages);
    }
  }, [boughtImages]);

  console.log(data1);

  return (
    <>
      <Modal isCentered isOpen={onOpen} onClose={onToggle}>
        <OverlayTwo />
        <ModalContent bgColor={"transparent"} position={"fixed"} left="0">
          <ModalBody>
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="100vh"
              flexDirection="column"
            >
              <Flex
                // justifyContent="center"
                flexDirection={"column"}
                alignItems="center"
                width="63%"
                height="83%"
                // padding="10px"
                // bgColor="#ffddf4"
                borderRadius="8px"
              >
                <Flex
                  height={"5%"}
                  margin="10px"
                  borderBottom="2px solid"
                  width={"100%"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Text fontFamily={"mono"} fontWeight="bold" fontSize="230%">
                    YOUR
                  </Text>
                  <Text fontFamily={"mono"} fontWeight="thin" fontSize="230%">
                    -COLLECTION
                  </Text>
                </Flex>
                <Flex
                  height="95%"
                  width="100%"
                  overflow={"scroll"}
                  // css = "::-webkit-scrollbar {
                  //   width: 0px
                  // }"
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  <Flex
                    height="100%"
                    width="33.3%"
                    flexDirection="column"
                    // overflow="hidden"
                  >
                    {data1.length > 0 ? (
                      data1.map((singleData: any) => {
                        console.log("*");
                        const base64String = base64ArrayBuffer(
                          singleData.img.data.data
                        );
                        const width = singleData.width * 1;
                        const height = singleData.height * 1;
                        const size = singleData.size;
                        const price = singleData.price;
                        const title = singleData.title;
                        const discount = singleData.priceDiscount;
                        const photoId = singleData._id;
                        return (
                          <Frame
                            key={singleData._id}
                            id={photoId}
                            price={price}
                            discount={discount}
                            title={title}
                            width={width}
                            height={height}
                            size={size}
                            imageUrl={`data:image/*;base64,${base64String}`}
                          ></Frame>
                        );
                      })
                    ) : (
                      <Flex
                        width={"100%"}
                        height={"100%"}
                        justifyContent={"center"}
                      >
                        <Spinner
                          margin={"10%"}
                          width={"50px"}
                          height={"50px"}
                          color="#9370DB"
                        />
                      </Flex>
                    )}
                  </Flex>
                  <Flex
                    height="100%"
                    width="33.3%"
                    flexDirection="column"
                    // overflow="hidden"
                  >
                  </Flex>

                  <Flex
                    height="100%"
                    width="33.3%"
                    flexDirection="column"
                    // overflow="hidden"
                  >
                    <Flex
                      width={"100%"}
                      height={"100%"}
                      justifyContent={"center"}
                    >
                      <Spinner
                        margin={"10%"}
                        width={"50px"}
                        height={"50px"}
                        color="#9370DB"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Box borderRadius="50%" onClick={onToggle}>
                <CloseIcon
                  sx={{ color: "red", fontSize: "2.5rem" }}
                ></CloseIcon>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CollectionModal;
