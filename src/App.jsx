import React, { useState } from "react";
import Events from "./components/Events";
import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateEvent from "./components/CreateEvent";

function App() {
  const [eventAdded, setEventAdded] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function addEvent(newEvent) {
    fetch("https://toxidos-24688-default-rtdb.firebaseio.com/events.json", {
      method: "POST",
      body: JSON.stringify({
        date: newEvent.date,
        location: newEvent.location,
        costumerName: newEvent.costumerName,
        balanceHour: newEvent.balanceHour,
        hinumaCoverSong: newEvent.hinumaCoverSong,
        brideBlessSong: newEvent.brideBlessSong,
        isDj: newEvent.isDj,
        dressCode: newEvent.dressCode,
        finishTime: newEvent.finishTime,
        imEshkachech: newEvent.imEshkachech,
        breakinGglassSong: newEvent.breakinGglassSong,
        givenPrice: newEvent.givenPrice,
        remarks: newEvent.remarks,
        id: newEvent.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        // setShowEvents(true);
        setEventAdded(true);
        setTimeout(() => {
          setEventAdded(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const closeTheCreateEvent = () => {
    setShowCreateEvent(false);
  };

  return (
    <div className={classes.appContainer}>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        key={Math.random()}
      />

      {!showCreateEvent && isAuthenticated && (
        <div className={classes.buttonContainer}>
          <button
            className={classes.button1}
            onClick={() => {
              setShowCreateEvent(true);
            }}
            // disabled={!isAuthenticated}
          >
            Create event
          </button>
        </div>
      )}
      {showCreateEvent && (
        <CreateEvent
          onAdd={addEvent}
          closeCreateEvent={closeTheCreateEvent}
          // eventIsAdded={eventAdded}
          key={Math.random()}
        />
      )}

      <Events
        eventAdded={eventAdded}
        closeTheCreateEvent={closeTheCreateEvent}
        isAuthenticated={isAuthenticated}
        key={Math.random()}
      />
      <Footer />
    </div>
  );
}

export default App;
