import React, { useState } from 'react';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Section from './components/Section';
import Notification from 'components/Notification/Notification';

const App = () => {
  const [good, setGoodReview] = useState(0);
  const [neutral, setNeutralReview] = useState(0);
  const [bad, setBadReview] = useState(0);

  const onReviewClick = e => {
    switch (e.currentTarget.id) {
      case 'good':
        setGoodReview(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutralReview(prevState => prevState + 1);
        break;
      case 'bad':
        setBadReview(prevState => prevState + 1);
        break;
    }
  };

  const getTotal = () =>
    [good, bad, neutral].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

  const getPositivePercentage = () =>
    Number(((good / getTotal()) * 100).toFixed(0));

  const options = Object.keys({ good, neutral, bad });
  const total = getTotal();
  const positivePercentage = getPositivePercentage();

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onReviewClick}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        )}
      </Section>
    </>
  );
};

export default App;
