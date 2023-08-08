const dateFormat = (date) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  module.exports = dateFormat;  