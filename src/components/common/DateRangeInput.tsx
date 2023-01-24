import { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, FocusedInputShape } from 'react-dates';

import moment from 'moment';

const DateRangeInput = () => {
  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [endDate, setEndDate] = useState<moment.Moment>(moment());
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const handleDateChange = (startDate: moment.Moment | null, endDate: moment.Moment | null) => {
    if (startDate) {
      setStartDate(startDate);
    }
    if (endDate) {
      setEndDate(endDate);
    }
  };

  const handleFocusChange = (focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="startRange"
      endDate={endDate}
      endDateId="endRange"
      onDatesChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => handleFocusChange(focusedInput)}
      showDefaultInputIcon={true}
    />
  );
};

export default DateRangeInput;
