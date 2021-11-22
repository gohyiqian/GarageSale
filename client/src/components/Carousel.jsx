import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../dummyData";
import { mobile } from "../responsiveMobile";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  position: relative;
  overflow: hidden;
  // ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto 50px;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  &:hover {
    background-color: #945047;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 30vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Desc = styled.p`
  margin: 15px 0px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  font-size: 15px;
  border: 2px grey solid;
  border-radius: 15px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #a94c4c;
    color: white;
  }
`;

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // carousel logics
  const handleClick = (direction) => {
    if (direction === "left") {
      // if click left at first slide, go to 3rd slide (index2), else go to prev slide
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      // if click right at 3rd slide(index2), go back to first slide, else go next slide
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      {/* Using dummyData */}
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>

            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to={`/posts/product`}>
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>

            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Carousel;
