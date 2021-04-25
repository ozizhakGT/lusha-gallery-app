import React, { useEffect, useRef } from "react";
import propTypes from "prop-types";
import StyledImageWrapper from "./StyledImageWrapper";
import { ReactSVG } from "react-svg";
import likeIcon from "../../assets/images/heart.svg";
import useImageLikesCounter from "../../hooks/useImageLikes";


export default function ImageWrapper({ className, ...rest }) {
  const hasLiked = useRef(false);
  const { url, likes, description, id } = rest;
  const {onDoubleClick, likesCounter} = useImageLikesCounter(id, likes);

  useEffect(() => {
    if (hasLiked.current) return () => {}

    hasLiked.current = true
  }, [likesCounter]);

  return (
    <StyledImageWrapper className={className} imgSrc={url} hasLiked={hasLiked.current} >
      <p className="description">{description}</p>
      <div className="likes-container">
        <ReactSVG onDoubleClick={onDoubleClick} src={likeIcon} />
        <span>{likesCounter}</span>
      </div>
    </StyledImageWrapper>
  )
}

ImageWrapper.propTypes = {
  className: propTypes.string.isRequired
}
ImageWrapper.defaultProps = {
  className: ''
}