<template>
  <div class="pt-5">
    <div
      class="flex justify-evenly items-center border-b border-black/10 gap-x-4 px-4 pb-6"
    >
      <div
        class="px-4 py-2 rounded-xl space-y-1 w-[40%]"
        :class="checkIn ? 'bg-main/10' : ''"
        @click="checkIn = true"
      >
        <p class="text-xs font-medium">Check-in</p>
        <p class="text-sm font-medium text-main">
          {{ format(selectedDay, "MMM dd, yyyy") }}
        </p>
      </div>
      <div class="flex justify-center items-center">-</div>
      <div
        class="px-4 py-2 rounded-xl space-y-1 w-[40%]"
        @click="checkIn = false"
        :class="!checkIn ? 'bg-main/10' : ''"
      >
        <p class="text-xs font-medium">Check-out</p>
        <p class="text-sm font-medium text-main">
          {{ format(secSelectedDay, "MMM dd, yyyy") }}
        </p>
      </div>
    </div>
    <div class="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 pt-4">
      <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div class="md:pr-14">
          <div class="flex items-center">
            <h2 class="flex-auto font-semibold text-gray-900">
              {{ format(firstDayCurrentMonth, "MMMM yyyy") }}
            </h2>
            <button
              type="button"
              @click="previousMonth"
              class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              @click="nextMonth"
              type="button"
              class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div
            class="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500"
          >
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div class="grid grid-cols-7 mt-2 text-sm">
            <div
              v-for="(day, dayIdx) in days"
              :key="day.toString()"
              :class="
                classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  'py-1.5'
                )
              "
            >
              <button
                type="button"
                @click="setSelectedDay(day)"
                :class="
                  classNames(
                    isBetween(day, selectedDay, secSelectedDay) &&
                      'bg-main text-white',
                    isEqual(day, selectedDay) &&
                      'bg-main text-white rounded-full',
                    !isEqual(day, selectedDay) && isToday(day) && 'text-red',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    isPastOrToday(day) && 'opacity-20'
                  )
                "
                :disabled="isPastOrToday(day)"
              >
                <time :dateTime="format(day, 'yyyy-MM-dd')">
                  {{ format(day, "d") }}
                </time>
              </button>

              <div class="w-1 h-1 mx-auto mt-1">
                <div
                  v-if="
                    meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    )
                  "
                  class="w-1 h-1 rounded-full bg-sky-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 pt-4">
      <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div class="md:pr-14 pb-20">
          <div class="flex items-center">
            <h2 class="flex-auto font-semibold text-gray-900">
              {{ format(secDayCurrentMonth, "MMMM yyyy") }}
            </h2>
            <button
              type="button"
              @click="previousMonth"
              class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              @click="nextMonth"
              type="button"
              class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div
            class="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500"
          >
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div class="grid grid-cols-7 mt-2 text-sm">
            <div
              v-for="(day, dayIdx) in secDays"
              :key="day.toString()"
              :class="
                classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  'py-1.5'
                )
              "
            >
              <button
                type="button"
                @click="setSelectedDay(day)"
                :class="
                  classNames(
                    isBetween(day, selectedDay, secSelectedDay) &&
                      'bg-main text-white',
                    isEqual(day, selectedDay) &&
                      'bg-main text-white rounded-full',
                    !isEqual(day, selectedDay) && isToday(day) && 'text-red',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    isPastOrToday(day) && 'opacity-20'
                  )
                "
                :disabled="isPastOrToday(day)"
              >
                <time :dateTime="format(day, 'yyyy-MM-dd')">
                  {{ format(day, "d") }}
                </time>
              </button>

              <div class="w-1 h-1 mx-auto mt-1">
                <div
                  v-if="
                    meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    )
                  "
                  class="w-1 h-1 rounded-full bg-sky-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <section class="mt-12 md:mt-0 bottom-0 fixed w-[100vw] left-0 bg-white">
          <div class="px-4 pt-2">
            <button
              @click="goToMainPage"
              class="text-center border-t w-full bg-main border-black/10 rounded-full py-2 text-sm text-white font-semibold"
            >
              choose ( {{ daysBetween(selectedDay, secSelectedDay) }} Nights )
            </button>
          </div>
          <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500">
            <template v-if="selectedDayMeetings.length > 0">
              <Meeting
                v-for="meeting in selectedDayMeetings"
                :key="meeting.id"
                :meeting="meeting"
              />
            </template>
            <!-- <p v-else>No meetings for today.</p> -->
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
// import { Menu, Transition } from '@headlessui/vue';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  isBefore,
  startOfToday,
  isAfter,
} from "date-fns";
import { differenceInDays } from "date-fns";
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(["change"]);

const meetings = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const today = startOfToday();
const selectedDay = ref(today);
const currentMonth = ref(format(today, "MMM-yyyy"));
const firstDayCurrentMonth = computed(() =>
  parse(currentMonth.value, "MMM-yyyy", new Date())
);
const secDayCurrentMonth = computed(() =>
  add(firstDayCurrentMonth.value, { months: 1 })
);

// const isDayInSelectedRange = (day) => {
//   if (selectedDay.value && secSelectedDay.value) {
//     return isWithinInterval(day, {
//       start: selectedDay.value,
//       end: secSelectedDay.value,
//     });
//   }
//   return false;
// };

const days = computed(() =>
  eachDayOfInterval({
    start: firstDayCurrentMonth.value,
    end: endOfMonth(firstDayCurrentMonth.value),
  })
);

const secDays = computed(() =>
  eachDayOfInterval({
    start: secDayCurrentMonth.value,
    end: endOfMonth(secDayCurrentMonth.value),
  })
);

// Helper function to determine if a date is past or today
function isPastOrToday(day) {
  return isBefore(day, today);
}

function previousMonth() {
  const firstDayNextMonth = add(firstDayCurrentMonth.value, { months: -1 });
  currentMonth.value = format(firstDayNextMonth, "MMM-yyyy");
}

function nextMonth() {
  const firstDayNextMonth = add(firstDayCurrentMonth.value, { months: 1 });
  currentMonth.value = format(firstDayNextMonth, "MMM-yyyy");
}

const selectedDayMeetings = computed(() =>
  meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay.value)
  )
);

const checkIn = ref(true);
const secSelectedDay = ref(add(today, { days: 4 }));
function setSelectedDay(day) {
  if (checkIn.value) {
    selectedDay.value = day; // Set secSelectedDay to be 4 days after by default
  } else {
    secSelectedDay.value = day;

    // Ensure selectedDay is earlier or equal to secSelectedDay
    if (secSelectedDay.value < selectedDay.value) {
      // Swap if secSelectedDay is earlier
      [selectedDay.value, secSelectedDay.value] = [
        secSelectedDay.value,
        selectedDay.value,
      ];
    }
  }
}

function isBetween(date) {
  return (
    (isAfter(date, selectedDay.value) || isEqual(date, selectedDay.value)) &&
    (isBefore(date, secSelectedDay.value) ||
      isEqual(date, secSelectedDay.value))
  );
}

function daysBetween(start, end) {
  return differenceInDays(end, start);
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const goToMainPage = () => {
  if (selectedDay.value && secSelectedDay.value) {
    let data = {
      checkin_date: format(selectedDay.value, "yyyy-MM-dd"),
      checkout_date: format(secSelectedDay.value, "yyyy-MM-dd"),
    };
    emit("change", data);
    console.log("====================================");
    console.log(format(selectedDay.value, "MMM dd, yyyy"));
    console.log("====================================");
  } else {
    toast.error("need to select 2 dates");
  }
};
</script>

<style scoped>
/* Add any additional CSS here */
</style>
