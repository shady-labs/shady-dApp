import { useEffect, useRef, useState } from 'react'
import { Grid, GridItem, Button,Flex, Hide, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  nextTrack,
  prevTrack,
  setPlaying
} from '../../redux/slices/playerSlice'
import VolumeControl from './VolumeControl'
import TrackDetails from './TrackDetails'
import PlayControls from './PlayControls'
import PlayingBar from './PlayingBar'
import { PiQueueFill } from "react-icons/pi";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Image
} from "@chakra-ui/react";


import {
  TbArrowsShuffle,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
} from "react-icons/tb";
import { toggleRepeat, toggleShuffle} from "../../redux/slices/playerSlice";

const MusicPlayer = () => {
  const { isOpen, onClose } = useDisclosure()
  const modalRef = useRef()
  const dispatch = useDispatch()
  const { currentTrack, repeatStatus, shuffleStatus, currentIndex, trackList, isPlaying } =
    useSelector(state => state.player)
  const audioRef = useRef()

  const isEndOfTracklist = currentIndex === trackList.length - 1

  const [songDetails, setSongDetails] = useState(null)
  const [audioPlaying, setAudioPlaying] = useState(
    audioRef.current && audioRef.current.playing
  )
  useEffect(() => {
    if (audioPlaying) {
      dispatch(setPlaying(true))
    } else {
      dispatch(setPlaying(false))
    }
  }, [audioPlaying])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    }
  }, [isPlaying])

  useEffect(() => {
    setSongDetails(prev => {
      return { ...prev, time: 0 }
    })
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }, [currentTrack?._id])

  useEffect(() => {
    setSongDetails({
      volume: 1,
      time: audioRef?.current
        ? Math.round(
            (audioRef?.current.currentTime / audioRef.current.duration) * 100
          ) // eslint-disable-line no-mixed-spaces-and-tabs
        : 0,
      shuffle: false,
      repeat: false
    })
  }, [audioRef.current])

  const seekPoint = e => {
    audioRef.current.currentTime = (e / 100) * audioRef.current.duration

    setSongDetails(prev => ({
      ...prev,
      time: Math.round(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )
    }))
  }

  const changeVolume = e => {
    setSongDetails(prevValues => {
      return { ...prevValues, volume: e / 100 }
    })
    audioRef.current.volume = e / 100
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef?.current.pause()
      dispatch(setPlaying(false))
    } else {
      audioRef?.current.play()
      dispatch(setPlaying(true))
    }
  }

  const volumeToggle = () => {
    if (songDetails?.volume > 0) {
      setSongDetails(prev => {
        return { ...prev, volume: 0 }
      })
      audioRef.current.volume = 0
    } else {
      setSongDetails(prev => {
        return { ...prev, volume: 1 }
      })
      audioRef.current.volume = 1
    }
  }

  useEffect(() => {
    audioRef.current.currentTime = 0
    audioRef?.current.play()
    dispatch(setPlaying(true))
  }, [currentTrack.src])

  const handleNextSong = () => {
    if (trackList.length == 1) {
      restartSong()
    } else {
      dispatch(nextTrack())
    }
  }

  const handlePreviousSong = () => {
    if (trackList.length == 1) {
      restartSong()
    } else {
      dispatch(prevTrack())
    }
  }

  const restartSong = () => {
    setSongDetails(prev => {
      return { ...prev, time: 0 }
    })
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  const handleEnded = () => {
    switch (repeatStatus) {
      case 'OFF':
        if (!isEndOfTracklist) {
          handleNextSong()
        }
        break
      case 'TRACKLIST':
        handleNextSong()
        break
      case 'SINGLE':
        audioRef.current.play()
        break

      default:
        break
    }
  }

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
    title: currentTrack?.title,
    artist: currentTrack?.artistes,
    // album: 'Utopia',
    artwork: [
        { src: currentTrack?.coverImage },
    ]
    });
  
    navigator.mediaSession.setActionHandler('play', function() {
      audioRef.current.play()
    });
    navigator.mediaSession.setActionHandler('pause', function() {
      audioRef.current.pause()
    });
    navigator.mediaSession.setActionHandler('seekbackward', function() {
      seekPoint(songDetails?.time - 10)
    });
    navigator.mediaSession.setActionHandler('seekforward', function() {
      seekPoint(songDetails?.time + 10)
    });
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      handlePreviousSong()
    });
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      handleNextSong()
    });
  }

  return (
    <>
      <SimpleGrid
        templateColumns="repeat(3, 1fr)"
        align="center"
        justify="space-between"
        position="fixed"
        bottom="0"
        left="0"
        zIndex={100}
        width="full"
        p={4}
        pt={2}
        pb={2}
        // roundedTop="lg"
        bgColor="blackAlpha.700"
        backdropFilter="blur(90px)"
      >
        <TrackDetails track={currentTrack} />
        <Flex direction="column">
          <PlayingBar
            onSeek={seekPoint}
            time={songDetails?.time}
            track={currentTrack}
            trackRef={audioRef.current}
          />
          {/* <Flex direction="row" justify="space-around"> */}
          {/* <TrackDetails track={currentTrack} /> */}
          <PlayControls
            isPlaying={isPlaying}
            onNext={handleNextSong}
            onPlay={handlePlayPause}
            onPrevious={handlePreviousSong}
            repeatStatus={repeatStatus}
          />
          {/* </Flex> */}
        </Flex>
        <Flex align="center" justify="flex-end">
          <Flex justifyContent="space-between" gap={0}>
            <Hide below="md">
              <VolumeControl
                onChange={changeVolume}
                onToggle={volumeToggle}
                volume={songDetails ? songDetails?.volume : 0}
              />
            </Hide>
            <audio
              ref={audioRef}
              src={currentTrack?.songUrl}
              onPause={() => setAudioPlaying(false)}
              onPlay={() => setAudioPlaying(true)}
              onEnded={handleEnded}
              onTimeUpdate={() => {
                setSongDetails((prev) => ({
                  ...prev,
                  time: Math.round(
                    (audioRef.current.currentTime / audioRef.current.duration) *
                      100
                  ),
                }));
              }}
            />
          </Flex>
          <Flex>
            <Hide below="md">
              <Button
                onClick={() => dispatch(toggleRepeat())}
                color={repeatStatus == "OFF" ? "zinc.600" : "accent.light"}
                variant="unstyled"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                {repeatStatus === "OFF" ? (
                  <TbRepeatOff color="inherit" size={18} />
                ) : repeatStatus === "SINGLE" ? (
                  <TbRepeatOnce color="inherit" size={18} />
                ) : (
                  <TbRepeat color="inherit" size={18} />
                )}
              </Button>
            </Hide>
            <Hide below="md">
              <Button
                color={shuffleStatus == "OFF" ? "zinc.600" : "accent.light"}
                variant="unstyled"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => dispatch(toggleShuffle())}
              >
                <TbArrowsShuffle color="inherit" size={18} />
              </Button>
            </Hide>
            <Popover placement="top-start" returnFocusOnClose={false}>
              <PopoverTrigger>
                <Button
                  color="#E5B8F4"
                  variant="unstyled"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <PiQueueFill color="inherit" size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                border={"0px"}
                mb={2}
                height={"40vh"}
                bgColor="blackAlpha.700"
                backdropFilter="blur(90px)"
              >
                <PopoverHeader fontWeight="semibold" border={"0px"}>
                  Queue Implementation {

                    trackList.map((track)=>{
                      // console.log(track.coverImage)
                      return (
                        <>
                            <Flex
                            >
                              <Image
                                src={track?.coverImage}
                                alt={track?.title}
                                padding={"2"}
                                w={{ base: "2rem", md: "3rem" }}
                                h={{ base: "2rem", md: "3rem" }}
                                rounded="lg"
                                objectFit="cover" />
                              <h1>{track.title}</h1>
                            </Flex>
                        </>
                      )
                    })
                  }
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody></PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </SimpleGrid>
    </>
  );
}

export { MusicPlayer }
