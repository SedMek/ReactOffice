import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import { Card } from "@blueprintjs/core";
import { Row, Col } from "react-flexbox-grid";

const VideoChat = ({ socket }) => {
	const userVideo = useRef();
	const partnerVideo = useRef();

	const [stream, setStream] = useState();

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream);
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
			}
		});

		socket.on("hey", (data) => {
			console.log("hey");
		});
	}, [socket]);

	let UserVideo;
	if (stream) {
		UserVideo = <video playsInline muted ref={userVideo} autoPlay />;
	}

	let PartnerVideo;
	// if (callAccepted) {
	// 	PartnerVideo = <ReactPlayer playsInline ref={partnerVideo} autoPlay />;
	// }

	return (
		<Row>
			<Col key={1} xs={12} sm={12} md={6} lg={6} xl={3}>
				<Card>{UserVideo}</Card>
			</Col>
			<Col key={2} xs={12} sm={12} md={6} lg={6} xl={3}>
				<Card>{PartnerVideo}</Card>
			</Col>
		</Row>
	);
};
export default VideoChat;
