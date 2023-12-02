import { useState } from "react";
import {
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

const VolumeControl = ({ onToggle, onChange, volume }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Flex
      align="center"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering && (
        <Slider
          aria-label="volume-slider"
          width="5rem"
          onChange={onChange}
          value={volume ? volume * 100 : 0}
          zIndex={1000}
        >
          <SliderTrack boxSize={1} bg="#E5B8F4">
            <SliderFilledTrack bg="#810CA8" />
          </SliderTrack>
          {/* <SliderThumb boxSize={0} outline={0} /> */}
        </Slider>
      )}
      <Button
        variant="unstyled"
        p={0}
        m={0}
        display="inline-flex"
        boxSize={6}
        onClick={onToggle}
      >
        {volume === 0 ? (
          <BsFillVolumeMuteFill color="#52525b" size={18} />
        ) : (
          <BsFillVolumeUpFill color="#E5B8F4" size={18} />
        )}
      </Button>
    </Flex>
  );
};

export default VolumeControl;
