const createUserLookup = (userDocs, journeyData) => {
  return journeyData.reduce((acc, { belongs_to }) => {
    acc[belongs_to] = userDocs.find(doc => doc.username === belongs_to);
    return acc;
  }, {});
};

const formatJourneyData = (journeyData, userLookup) => {
  return journeyData.map(journeyDatum => {
    const { belongs_to } = journeyDatum;
    return {
      ...journeyDatum,
      belongs_to: userLookup[belongs_to]
    };
  });
};

module.exports = { createUserLookup, formatJourneyData };
