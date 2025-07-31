import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


import off from "../assets/camera-off.png";
import on from "../assets/camera-on.png";
import unmute from "../assets/mic.png";
import mute from "../assets/mute.png";
import end from "../assets/end.png";

// Configure toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
  closeButton: false,
  progressBar: true,
  positionClass: "toast-top-center",
  timeOut: "3000",
  preventDuplicates: true,
};

// Connect to signaling server
const socket = io("https://video-conference-back.onrender.com");

function Room() {
  const { id } = useParams();                   // Room ID from URL
  const navigate = useNavigate();               // Navigation handler
  const localVideoRef = useRef();               // Local video reference
  const remoteVideoRef = useRef();              // Remote video reference
  const peerConnection = useRef(null);          // WebRTC connection reference

  const [mediaStream, setMediaStream] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setupConnection(stream);  // Setup WebRTC after media access
      } catch (err) {
        console.error("Failed to access webcam/mic:", err);
      }
    }

    getMedia();

    return () => {
      if (peerConnection.current) peerConnection.current.close();
      socket.disconnect();
    };
  }, []);

  // Setup WebRTC and signaling
  const setupConnection = (stream) => {
    socket.emit("join-room", id);

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId: id,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    socket.on("user-joined", async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { roomId: id, offer });
    });

    socket.on("offer", async ({ offer }) => {
      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { roomId: id, answer });
    });

    socket.on("answer", async ({ answer }) => {
      await peerConnection.current.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnection.current.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding ICE candidate", err);
      }
    });
  };

  const toggleMute = () => {
    if (!mediaStream) return;
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsAudioMuted((prev) => {
      const newMuted = !prev;
      if (newMuted) {
        toastr.info("Audio muted");
      } else {
        toastr.success("Audio unmuted");
      }
      return newMuted;
    });
  };

  const toggleVideo = () => {
    if (!mediaStream) return;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoOff((prev) => {
      const newVideoOff = !prev;
      if (newVideoOff) {
        toastr.warning("Video turned off");
      } else {
        toastr.success("Video turned on");
      }
      return newVideoOff;
    });
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    toastr.error("Call disconnected");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Room ID: {id}</h2>
      <div className="video-grid">
        <video ref={localVideoRef} autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <div className="controls">
        <button className="end" onClick={endCall}>
          <img src={end} alt="End call" />
        </button>
        <button className="mute" onClick={toggleMute}>
          <img src={isAudioMuted ? mute : unmute} alt="Toggle mic" />
        </button>
        <button className="video-off" onClick={toggleVideo}>
          <img src={isVideoOff ? off : on} alt="Toggle video" />
        </button>
      </div>
    </div>
  );
}

export default Room;
