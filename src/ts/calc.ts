/* eslint-disable no-param-reassign */
export {};

const leftColor = '#ffdd00';
const rightColor = '#000';

const rangeElList = document.querySelectorAll('.js-range');

const clientsRange = document.querySelector(
  '.js-clients-range',
) as HTMLInputElement;
const deliveryRange = document.querySelector(
  '.js-delivery-range',
) as HTMLInputElement;
const monthRange = document.querySelector(
  '.js-month-range',
) as HTMLInputElement;

const resultLabelElList = document.querySelectorAll('.js-calc-result');

let result: number;

let clientsCurrentStep = 3;
let deliveryCurrentStep = 3;
let monthCurrentStep = 3;

const clientsEndpointElList = document.querySelectorAll(
  '.js-clients-endpoints .calc__endpoint-dot',
);
const deliveryEndpointElList = document.querySelectorAll(
  '.js-delivery-endpoints .calc__endpoint-dot',
);
const monthEndpointElList = document.querySelectorAll(
  '.js-month-endpoints .calc__endpoint-dot',
);

const calcResult = () => {
  result = (Number(clientsRange.value) * 390 + Number(deliveryRange.value) * 500)
    * (Number(monthRange.value) === 0 ? 1 : Number(monthRange.value));

  resultLabelElList.forEach(resultLabelEl => {
    resultLabelEl.textContent = result.toLocaleString();
  });

  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

clientsRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const processPrevStep = clientsCurrentStep;

  clientsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (processPrevStep < clientsCurrentStep) {
    clientsEndpointElList[clientsCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    clientsEndpointElList[processPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (clientsCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (clientsCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

deliveryRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const checkinPrevStep = deliveryCurrentStep;

  deliveryCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (checkinPrevStep < deliveryCurrentStep) {
    deliveryEndpointElList[deliveryCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    deliveryEndpointElList[checkinPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (deliveryCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (deliveryCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

monthRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const workshopPrevStep = monthCurrentStep;

  monthCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  if (workshopPrevStep < monthCurrentStep) {
    monthEndpointElList[monthCurrentStep].classList.add(
      'calc__endpoint-dot_active',
    );
  } else {
    monthEndpointElList[workshopPrevStep].classList.remove(
      'calc__endpoint-dot_active',
    );
  }

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (monthCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (monthCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
