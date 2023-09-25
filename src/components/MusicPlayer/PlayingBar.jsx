import {
	Box,
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";

import { convertToMins } from "../../utils";

const PlayingBar = ({ time, track, onSeek, trackRef }) => {
	return (
    <Flex justifyContent="space-between" gap={3}>
      <Text fontSize="xs" color="zinc.500">
        {trackRef ? convertToMins(trackRef.currentTime) : "0:00"}
      </Text>
      <Slider
        outline={0}
        _focus={{ outline: 0 }}
        aria-label="seek-slider"
        defaultValue={0}
        width="45rem"
        onChange={onSeek}
        value={!isNaN(time) ? time : 0}
      >
        <SliderTrack bg="#E5B8F4">
          <SliderFilledTrack bg="#810CA8" />
        </SliderTrack>
        <SliderThumb boxSize={3} outline={0}>
          <Box color="#810CA8" as={MdGraphicEq} />
        </SliderThumb>
      </Slider>
      <Text fontSize="xs" color="zinc.500">
        {track?.duration}
      </Text>
    </Flex>
  );
};

export default PlayingBar;
