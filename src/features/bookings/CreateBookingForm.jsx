import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "./useGuests";
import { useSettings } from "../settings/useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import SelectCabin from "./SelectCabin";
import Spinner from "../../ui/Spinner";
import SelectGuest from "./SelectGuest";

/* eslint-disable react/prop-types */

function CreateBookingForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    getValues,
    trigger,
  } = useForm();
  const { errors } = formState;

  const { isCreating, createBooking } = useCreateBooking();
  const { cabins, isLoading: isCabinLoading } = useCabins();
  const { guests, isLoading: isGuestsLoading } = useGuests();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const [showCabins, setShowCabins] = useState(false);
  const [cabinId, setCabinId] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const [guestsId, setGuestsId] = useState(null);

  if (isCabinLoading || isGuestsLoading || isSettingsLoading)
    return <Spinner />;

  const cabinPrice = cabins
    ?.filter((cabin) => cabin.id === cabinId)
    ?.at(0)?.regularPrice;
  //   console.log(cabinPrice);

  const cabinName = cabins
    ?.filter((cabin) => cabin.id === cabinId)
    ?.at(0)?.name;

  const guestName = guests
    ?.filter((guest) => guest.id === guestsId)
    ?.at(0)?.fullName;

  function onSubmit(data) {
    data = {
      ...data,
      hasBreakfast: data.extrasPrice === "yes",
      isPaid: data.isPaid === "yes",
      cabinPrice: cabinPrice,
      extrasPrice:
        data.extrasPrice === "yes"
          ? data.numGuests * data.numNights * settings?.breakfastPrice
          : 0,
      totalPrice:
        cabinPrice +
        (data.extrasPrice === "yes"
          ? data.numGuests * data.numNights * settings?.breakfastPrice
          : 0),
      cabinId: cabinId,
      guestId: guestsId,
    };
    // console.log(data);

    // Create a booking
    createBooking(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });

    // reset Id's
    setCabinId(null);
    setGuestsId(null);
  }

  /* eslint-disable-next-line */
  function onError(errors) {
    // console.log(errors);
  }

  function handleShowCabin() {
    setShowCabins((item) => !item);
  }

  function handleCabin(id) {
    setShowCabins((item) => !item);
    setCabinId(id);

    // Manually update the form state and trigger validation
    setValue("cabinId", id);
    trigger("cabinId"); // Revalidate the field
  }

  function handleShowGuest() {
    setShowGuests((guest) => !guest);
  }

  function handleGuest(id) {
    setShowGuests((guest) => !guest);
    setGuestsId(id);

    // Manually update the form state and trigger validation
    setValue("guestId", id);
    trigger("guestId"); // Revalidate the field
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "model" : "regular "}
    >
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreating}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isCreating}
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              value > getValues("startDate") ||
              "End Date should be greater than Start Date",
          })}
        />
      </FormRow>

      <FormRow label="Number of nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isCreating}
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: 3,
              message: "Minimun number of nights should be 3",
            },
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating}
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimun 1 guest required",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.extrasPrice?.message}>
        <span style={{ fontWeight: "bold" }}>Extras</span>
        <label>
          <Input
            type="radio"
            id="isExtrasYes"
            name="extrasPrice"
            value="yes"
            disabled={isCreating}
            {...register("extrasPrice", {
              required: "This field is required",
            })}
          />
          <span style={{ margin: "5px" }}>Yes</span>
        </label>
        <label>
          <Input
            type="radio"
            id="isExtrasNo"
            name="extrasPrice"
            value="no"
            disabled={isCreating}
            {...register("extrasPrice", {
              required: "This field is required",
            })}
          />
          <span style={{ margin: "5px" }}>No</span>
        </label>
      </FormRow>

      <Input
        type="hidden"
        id="status"
        value="unconfirmed"
        {...register("status")}
      />

      <FormRow
        label="Observations for booking"
        error={errors?.observations?.message}
      >
        <Textarea
          type="text"
          id="observations"
          disabled={isCreating}
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <FormRow error={errors?.isPaid?.message}>
        <span style={{ fontWeight: "bold" }}>Is Paid</span>
        <label>
          <Input
            type="radio"
            id="isPaidYes"
            name="isPaid"
            value="yes"
            disabled={isCreating}
            {...register("isPaid", {
              required: "This field is required",
            })}
          />
          <span style={{ margin: "5px" }}>Yes</span>
        </label>
        <label>
          <Input
            type="radio"
            id="isPaidNo"
            name="isPaid"
            value="no"
            disabled={isCreating}
            {...register("isPaid", {
              required: "This field is required",
            })}
          />
          <span style={{ margin: "5px" }}>No</span>
        </label>
      </FormRow>

      <FormRow error={errors?.cabinId?.message}>
        <span style={{ fontWeight: "bold" }}>Select Cabin for Booking</span>
        <Input
          type="button"
          value={cabinId === null ? "Select Cabin" : cabinName}
          id="cabinButton"
          onClick={handleShowCabin}
        />

        {/* Hidden input field to store and validate cabinId */}
        <Input
          type="hidden"
          id="cabinId"
          value={cabinId || ""}
          {...register("cabinId", {
            required: "This field is required",
            validate: (value) => {
              value !== "" || "Select a cabin first";
            },
          })}
        />

        {showCabins && (
          <SelectCabin cabins={cabins || {}} handleCabin={handleCabin} />
        )}
      </FormRow>

      <FormRow error={errors?.guestId?.message}>
        <span style={{ fontWeight: "bold" }}>Select guests for Booking</span>
        <Input
          type="button"
          value={guestsId === null ? "Select guest" : guestName}
          id="guestButton"
          onClick={handleShowGuest}
        />

        {/* Hidden input field to store and validate guestsId */}
        <Input
          type="hidden"
          id="guestId"
          value={guestsId || ""}
          {...register("guestId", {
            required: "This field is required",
            validate: (value) => value !== "" || "Select a guest first",
          })}
        />

        {showGuests && (
          <SelectGuest guests={guests || {}} handleGuest={handleGuest} />
        )}
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
