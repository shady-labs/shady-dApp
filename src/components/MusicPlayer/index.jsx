import { useEffect, useRef, useState } from 'react'
import { Flex, Hide, SimpleGrid, useDisclosure } from '@chakra-ui/react'
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

const MusicPlayer = () => {
  const { isOpen, onClose } = useDisclosure()
  const modalRef = useRef()
  const dispatch = useDispatch()
  const { currentTrack, repeatStatus, currentIndex, trackList, isPlaying } =
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

  return (
    <>
      <SimpleGrid
        templateColumns='repeat(3, 1fr)'
        align='center'
        justify='space-between'
        position='fixed'
        bottom='0'
        left='0'
        zIndex={100}
        width='full'
        p={4}
        roundedTop='lg'
        bgColor='blackAlpha.700'
        backdropFilter='blur(90px)'
      >
        <TrackDetails track={currentTrack} />
        <Flex direction='column' gap={2}>
          <PlayingBar
            onSeek={seekPoint}
            time={songDetails?.time}
            track={currentTrack}
            trackRef={audioRef.current}
          />
          <PlayControls
            isPlaying={isPlaying}
            onNext={handleNextSong}
            onPlay={handlePlayPause}
            onPrevious={handlePreviousSong}
            repeatStatus={repeatStatus}
          />
        </Flex>
        <Flex align='center' justify='flex-end' gap={{ base: 0, md: 4 }}>
          <Flex justifyContent='space-between' gap={0}>
            <Hide below='md'>
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
                setSongDetails(prev => ({
                  ...prev,
                  time: Math.round(
                    (audioRef.current.currentTime / audioRef.current.duration) *
                      100
                  )
                }))
              }}
            />
          </Flex>
        </Flex>
      </SimpleGrid>
    </>
  )
}

export { MusicPlayer }
