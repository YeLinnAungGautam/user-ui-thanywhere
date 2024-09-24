<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative" v-if="!loading">
      <div class="" :style="imageStyles">
        <ImageCarousel :data="detail?.images" />
        <ChevronLeftIcon
          @click="router.push('/home/hotel-bookings')"
          class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 left-6"
        />
        <div
          @click="shareContent"
          class="bg-white rounded-full p-2 w-9 h-9 text-main z-20 absolute top-10 right-[70px]"
        >
          <img :src="ShareIcon" class="w-full h-full object-cover" alt="" />
        </div>
        <HeartIcon
          class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 right-6"
        />
      </div>

      <transition name="fade">
        <div
          v-if="showDiv"
          class="flex fixed shadow-custom z-30 top-0 py-3 bg-white flex-1 justify-start space-x-4 px-5 items-center overflow-x-scroll scroll-container border-b border-black/10"
        >
          <a
            href="#location"
            :class="tagsNum == 1 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 1"
            class="text-xs font-semibold whitespace-nowrap"
            >location</a
          >
          <a
            href="#options"
            :class="tagsNum == 2 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 2"
            class="text-xs font-semibold whitespace-nowrap"
            >select options</a
          >
          <a
            href="#about"
            :class="tagsNum == 3 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 3"
            class="text-xs font-semibold whitespace-nowrap"
            >about the hotel</a
          >
          <a
            href="#faqs"
            :class="tagsNum == 4 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 4"
            class="text-xs font-semibold whitespace-nowrap"
            >faqs</a
          >
          <a
            href="#other"
            :class="tagsNum == 5 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 5"
            class="text-xs font-semibold whitespace-nowrap"
            >other hotels</a
          >
        </div>
      </transition>
      <div class="relative" id="location">
        <div
          class="bg-black w-[45px] rounded-lg h-[6px] z-30 mx-auto absolute -top-2 left-[45%]"
        ></div>
        <div class="bg-black/5 mb-4 space-y-6">
          <div class="space-y-4">
            <div class="bg-white px-5 py-2">
              <div class="">
                <h1 class="text-main text-lg font-medium">
                  {{ detail?.name }}
                </h1>
                <!-- <p class="text-sm font-normal text-main">
                  {{ getRoomTypeCount }} type rooms
                </p> -->
              </div>
              <div class="flex justify-between items-center pt-1">
                <div class="flex justify-start items-center gap-x-0.5">
                  <div v-for="i in detail?.rating" :key="i" class="">
                    <StarIcon class="w-3 h-3 text-main" />
                  </div>
                </div>
                <div
                  class="flex justify-end items-center gap-x-1 bg-black/5 px-2 py-1 rounded-2xl"
                >
                  <img :src="Pin" class="w-4 h-4" alt="" />
                  <p class="text-xs">
                    {{ detail?.city?.name }} , {{ detail?.place }}
                  </p>
                </div>
              </div>

              <div class="space-y-4 pt-6" v-if="detail?.location_map != 'null'">
                <h1 class="font-semibold border-l-4 border-main pl-3">
                  Location
                </h1>
                <iframe
                  :src="detail?.location_map"
                  class="w-[100%] h-[200px] rounded-xl overflow-hidden"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <p class="text-xs leading-5" id="options">
                  {{ detail?.location_map_title }}
                </p>
                <!-- <p class="text-xs text-main pb-6">view in map</p> -->
              </div>
            </div>
            <div class="bg-white px-5 py-3 space-y-4">
              <h1 class="font-semibold border-l-4 border-main pl-3">
                Select Options
              </h1>
              <div
                class="flex flex-1 justify-start space-x-3 pt-2 pb-2 items-center overflow-x-scroll scroll-container"
              >
                <div
                  v-for="i in detail?.rooms"
                  :key="i"
                  @click="chooseDataFunction(i)"
                  :class="i?.is_extra != 1 ? '' : 'hidden'"
                >
                  <div v-if="i?.is_extra != 1">
                    <RoomCart :i="i" :isActive="chooseData?.id == i?.id" />
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <div
                  class="flex flex-1 justify-start space-x-3 mt-2 pb-2 items-center overflow-x-scroll scroll-container"
                >
                  <div
                    :class="
                      !choosePax
                        ? 'border-main text-main'
                        : 'border-black/10 text-black/80'
                    "
                    class="border rounded-lg space-y-1 min-w-[180px] max-w-[300px] p-3"
                    @click="choosePax = false"
                  >
                    <p class="text-xs font-medium whitespace-nowrap">
                      Extra Bed
                    </p>
                    <p class="text-xs font-medium" v-if="hasExtraRoom">
                      + 0 thb per pax
                    </p>
                    <p
                      class="text-xs font-medium text-red"
                      v-if="!hasExtraRoom"
                    >
                      not avalible !
                    </p>
                  </div>
                  <div
                    v-if="haveBreakfast"
                    class="border rounded-lg space-y-1 w-[400px] p-3"
                    :class="
                      choosePax
                        ? 'border-main text-main'
                        : 'border-black/10 text-black/80'
                    "
                    @click="choosePax = true"
                  >
                    <p class="text-xs font-medium whitespace-nowrap">
                      Breakfast : Adult
                    </p>
                    <p class="text-xs font-medium" v-if="haveBreakfast">
                      + 800 thb per pax
                    </p>
                  </div>
                </div>
                <div class="space-y-2 pb-2">
                  <p class="text-base font-semibold" id="about">
                    Popular Ameneties
                  </p>
                  <div class="grid grid-cols-2 gap-2 pt-2">
                    <div
                      v-for="f in detail?.facilities"
                      :key="f.id"
                      class="flex justify-start items-center gap-2"
                    >
                      <img :src="f.image" alt="" class="w-6 h-6 object-fill" />
                      <p class="text-sm text-black/80">{{ f.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white px-5 py-3 space-y-4">
              <h1 class="font-semibold border-l-4 border-main pl-3">
                About the Hotel
              </h1>
              <p
                class="text-[13.5px] text-black/80 leading-6"
                :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
                v-html="
                  language == 'english'
                    ? detail?.full_description_en
                    : detail?.full_description
                "
              ></p>
              <p
                class="text-[12px] text-main"
                v-if="!seeMoreShow"
                @click="seeMoreShow = true"
              >
                see more
              </p>
              <p
                class="text-[12px] text-main"
                v-if="seeMoreShow"
                @click="seeMoreShow = false"
              >
                see less
              </p>
              <div class="space-y-6">
                <h1 class="font-semibold border-l-4 border-main pl-3">
                  Nearby Places
                </h1>
                <div class="space-y-2 pb-3">
                  <div
                    class="flex justify-between items-center gap-2"
                    v-for="i in detail?.nearby_places"
                    :key="i"
                  >
                    <div class="flex justify-start items-center gap-2">
                      <img
                        :src="i?.image"
                        class="w-7 h-7 rounded-lg"
                        alt=""
                        v-if="i.image != 'undefined'"
                      />
                      <img
                        :src="Pin"
                        class="w-5 h-5 rounded-lg"
                        alt=""
                        v-if="i.image == 'undefined'"
                      />

                      <p class="text-sm">{{ i?.name }}</p>
                    </div>
                    <p class="text-xs">{{ i?.distance }}</p>
                  </div>
                </div>
              </div>
              <div class="pt-5" id="faqs">
                <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
                  FAQs
                </h1>
                <div
                  class="divide-y divide-black/10 border-b border-black/10 border-t mt-3"
                >
                  <div
                    class="flex justify-between items-center"
                    @click="open('pickup')"
                  >
                    <p class="py-3 font-semibold text-sm text-black/80">
                      What time can you checkin & checkout?
                    </p>
                    <ChevronRightIcon class="w-5 h-5" />
                  </div>
                  <div
                    class="flex justify-between items-center"
                    @click="open('book')"
                  >
                    <p class="py-3 font-semibold text-sm text-black/80">
                      How to book this hotel?
                    </p>
                    <ChevronRightIcon class="w-5 h-5" />
                  </div>
                  <div
                    class="flex justify-between items-center"
                    @click="open('payment')"
                  >
                    <p class="py-3 font-semibold text-sm text-black/80">
                      How do I make a payment?
                    </p>
                    <ChevronRightIcon class="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white mt-4 mb-4 p-5 space-y-6" id="other">
              <h1 class="font-medium">other hotels in {{ detail?.place }}</h1>
              <div
                class="flex justify-start items-center flex-nowrap overflow-scroll scroll-container pb-2"
              >
                <div
                  class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
                  v-for="i in placeList ?? []"
                  :key="i"
                  :class="detail?.name == i?.name ? 'hidden' : ''"
                >
                  <div
                    @click="goDetialPage(i?.id)"
                    class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
                  >
                    <img
                      :src="i?.images[0]?.image"
                      class="w-full h-full object-cover"
                      alt=""
                      v-if="i?.images.length > 0"
                    />
                    <img
                      v-if="i?.images.length == 0"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                      class="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div class="py-3 px-2">
                    <p class="text-sm font-semibold line-clamp-2">
                      {{ i?.name }}
                    </p>
                    <p class="text-[10px] text-black font-medium">
                      {{ i.rating }}-star rating
                    </p>
                    <div
                      class="text-[10px] flex justify-start items-center gap-0.5 py-1"
                    >
                      <MapPinIcon class="w-3 h-3 text-black/80" />
                      <p class="text-black text-xs font-medium">
                        {{ i?.city.name }} , {{ i?.place }}
                      </p>
                    </div>
                    <div class="text-[10px] gap-0.5 pt-2 space-y-2">
                      <p class="text-black text-xs font-medium">
                        starting room price
                      </p>
                      <p
                        class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                      >
                        {{ i.lowest_room_price }} THB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal :isOpen="modalOpen" @closeModal="modalOpen = false">
          <DialogPanel
            class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="div"
              class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
            >
              <p class="opacity-0">...</p>
              <p class="text-sm font-medium text-main">
                select on option to book
              </p>
              <XMarkIcon class="w-5 h-5 text-main" @click="modalOpen = false" />
            </DialogTitle>
            <div class="grid grid-cols-2 gap-5">
              <a
                href="https://www.facebook.com/thailandanywherevip"
                target="_blink"
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="messengerIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">messenger</p>
                </div>
              </a>
              <div
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
                @click="viberModalOpenFunction('viber')"
              >
                <img
                  :src="viberIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">viber</p>
                </div>
              </div>
              <div
                @click="viberModalOpenFunction('whatsapp')"
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="whatsappIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">whats app</p>
                </div>
              </div>
              <div
                @click="viberModalOpenFunction('phone')"
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="callIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">call center</p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Modal>
        <Modal :isOpen="viberModalOpen" @closeModal="viberModalCloseFunction">
          <DialogPanel
            class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="div"
              class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
            >
              <div class="flex justify-start items-center gap-1">
                <ChevronLeftIcon
                  class="w-5 h-5 text-main"
                  @click="backLeftFunction"
                />
                <img
                  :src="viberIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'viber'"
                />
                <img
                  :src="whatsappIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'whatsapp'"
                />
                <img
                  :src="callIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'phone'"
                />
              </div>
              <p class="text-sm font-medium text-main">
                select on option to book
              </p>
              <XMarkIcon
                class="w-5 h-5 text-main"
                @click="viberModalCloseFunction"
              />
            </DialogTitle>
            <div>
              <SaleModalVue :type="type" />
            </div>
          </DialogPanel>
        </Modal>
      </div>

      <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
        <div class="font-poppins">
          <div class="h-[100vh]">
            <div class="flex justify-between items-center px-6 pb-4">
              <p class="opacity-0">........</p>
              <p
                class="text-black text-sm font-medium"
                v-if="openPart == 'pickup'"
              >
                What time can you checkin & checkout?
              </p>
              <p
                class="text-black text-sm font-medium"
                v-if="openPart == 'book'"
              >
                How to book this hotel?
              </p>
              <p
                class="text-black text-sm font-medium"
                v-if="openPart == 'payment'"
              >
                How do I make a payment?
              </p>
              <XMarkIcon class="w-5 h-5" @click="close" />
            </div>
            <div
              class="border border-black/10 p-4 ml-4 mr-4 rounded-xl h-[90vh] overflow-scroll"
            >
              <div v-if="openPart == 'pickup'">
                <p>this is testing</p>
              </div>
              <div v-if="openPart == 'book'">
                <p>this is testing</p>
              </div>
              <div v-if="openPart == 'payment'">
                <p>this is testing</p>
              </div>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
      <vue-bottom-sheet ref="myBottomSheetOptions" :max-height="1500">
        <div class="font-poppins">
          <div class="h-[85vh] w-[100%] overflow-hidden">
            <div class="flex justify-between items-center px-6 pb-4">
              <p class="opacity-0">........</p>
              <p class="text-black text-base font-medium">select options</p>

              <XMarkIcon class="w-5 h-5" @click="closeOption" />
            </div>
            <div
              class="border-t border-black/10 space-y-2 px-4 pt-4 ml-4 mr-4 h-[90vh] pb-10 overflow-scroll"
            >
              <p>Rooms Options</p>
              <div class="flex justify-between items-center text-xs">
                <p class="flex justify-start items-center gap-x-2">
                  {{ checkin_date }}
                  <span><ArrowLongRightIcon class="w-4 h-4" /></span>
                  {{ checkout_date }}
                </p>
                <p class="underline cursor-pointer" @click="openCalendar">
                  change dates
                </p>
              </div>
              <div v-for="i in detail?.rooms" :key="i.id" class="pt-3">
                <HotelRoomCart :data="i" v-if="i.is_extra != 1" />
              </div>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
      <vue-bottom-sheet ref="myBottomSheetCalendar" :max-height="1500">
        <div class="font-poppins">
          <div class="h-[100vh]">
            <div class="flex justify-between items-center px-6 pb-4">
              <p class="opacity-0">........</p>
              <p class="text-black text-base font-medium">edit dates</p>

              <XMarkIcon class="w-5 h-5" @click="closeCalendar" />
            </div>
            <CalendarSelectTwoDate @change="getDateChange" />
          </div>
        </div>
      </vue-bottom-sheet>
      <Modal :isOpen="modalDetailOpen" @closeModal="modalDetailOpen = false">
        <DialogPanel
          class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="div"
            class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
          >
            <p class="opacity-0">...</p>
            <p class="text-sm font-medium text-main">check your detail</p>
            <XMarkIcon
              class="w-5 h-5 text-main"
              @click="modalDetailOpen = false"
            />
          </DialogTitle>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <p class="">hotel name :</p>
            <p class="col-span-2">{{ detail?.name }}</p>
            <p class="">room type :</p>
            <p class="col-span-2">{{ chooseData.name }}</p>
            <p class="">checkin date :</p>
            <p class="col-span-2">{{ checkin_date }}</p>
            <p class="">checkout date :</p>
            <p class="col-span-2">{{ checkout_date }}</p>
            <p class="">Breakfast :</p>
            <p class="col-span-2">{{ choosePax ? "YES" : "No" }}</p>
            <p class="">room qty :</p>
            <p class="col-span-2">{{ room_qty ? room_qty : "-" }} pax</p>
            <p class="">total amount :</p>
            <p class="col-span-2">
              {{
                chooseData && choosePax
                  ? chooseData
                    ? chooseData.room_price
                    : detail?.lowest_room_price
                  : chooseData.room_price
              }}
              thb
            </p>
            <p class="">link :</p>
            <p class="col-span-2">{{ currentURL }}</p>
          </div>
          <div class="pt-6">
            <button
              class="w-full text-sm rounded-full text-white bg-main py-2 px-4 font-medium"
              @click="confirmDetailAction"
            >
              confirm & copy detail
            </button>
          </div>
        </DialogPanel>
      </Modal>
    </div>
    <div
      v-if="!loading"
      class="px-5 pb-3 sticky z-30 bg-white shadow-custom pt-2 border-t border-black/10 bottom-0"
    >
      <div class="flex justify-between items-end">
        <!-- <div>
          <div class="flex justify-start items-center gap-x-2">
            <p
              class="bg-main px-2 rounded-lg text-white text-xl"
              v-if="chooseCount != 0"
              @click="chooseCountMinus"
            >
              -
            </p>
            <p
              class="bg-black/10 px-2 rounded-lg text-black/20 text-xl"
              v-if="chooseCount == 0"
            >
              -
            </p>
            <p
              class="px-3 py-1 font-semibold flex justify-start items-center flex-nowrap gap-x-2"
            >
              {{ chooseCount }}<span class="text-xs font-normal">pax</span>
            </p>
            <p
              class="bg-main px-2 rounded-lg text-white text-xl"
              @click="chooseCountPlus"
              v-if="chooseCount != 5"
            >
              +
            </p>
            <p
              class="bg-black/10 px-2 rounded-lg text-black/20 text-xl"
              v-if="chooseCount == 5"
            >
              +
            </p>
          </div>
        </div> -->
        <div>
          <p class="text-xs font-medium">starting from</p>
          <p
            class="text-xl font-semibold text-main pt-1 pb-1"
            v-if="!choosePax"
          >
            ฿
            {{ chooseData ? chooseData.room_price : detail?.lowest_room_price }}
          </p>
          <!-- <p
            class="text-lg font-semibold text-main"
            v-if="choosePax && haveBreakfast"
          >
            {{
              chooseData
                ? chooseData.room_price * 1 + 800 * chooseCount
                : chooseData.room_price
            }}
            thb
          </p> -->
          <!-- <p
            class="text-lg font-semibold text-main"
            v-if="choosePax && !haveBreakfast"
          >
            {{
              chooseData
                ? chooseData.room_price * chooseCount
                : chooseData.room_price
            }}
            thb
          </p> -->
        </div>
        <!-- @click="openDetailModal" this is for talk to sale -->
        <div
          class="bg-main py-2.5 w-[180px] flex justify-center items-center gap-x-4 rounded-full text-center text-white text-sm shadow-custom"
          @click="openOption"
        >
          <ChevronDoubleUpIcon class="w-5 h-5" />
          <p class="font-medium">Select Options</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import { useSettingStore } from "../stores/setting";
import {
  ChevronLeftIcon,
  HeartIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import {
  StarIcon,
  ChevronDoubleUpIcon,
  ArrowLongRightIcon,
} from "@heroicons/vue/24/solid";
// import locationMap from "../assets/web/pin.svg";
import ShareIcon from "../assets/web/send.png";
import Pin from "@/assets/s/pin 1 (1).png";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import LoadingPageVue from "../components/layout/LoadingPage.vue";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import RoomCart from "../components/LoadingCarts/RoomCart.vue";
import SaleModalVue from "../components/cart/SaleModalVue.vue";
import { useOrderVantourStore } from "../stores/orderVantour";
import copy from "copy-to-clipboard";
import HotelRoomCart from "@/components/LoadingCarts/HotelRoomCart.vue";
import CalendarSelectTwoDate from "./CalendarSelectTwoDate.vue";

const route = useRoute();
const router = useRouter();
const hotelStore = useHotelStore();
const settingStore = useSettingStore();
const orderVantourStore = useOrderVantourStore();
const { checkin_date, checkout_date, room_qty } =
  storeToRefs(orderVantourStore);

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);
const { language } = storeToRefs(settingStore);

const placeList = ref(null);

const myBottomSheet = ref(null);
const myBottomSheetOptions = ref(null);
const openOption = () => {
  myBottomSheetOptions.value.open();
};
const closeOption = () => {
  myBottomSheetOptions.value.close();
};
const modalDetailOpen = ref(false);

const myBottomSheetCalendar = ref(null);
const openCalendar = () => {
  myBottomSheetCalendar.value.open();
};
const closeCalendar = () => {
  myBottomSheetCalendar.value.close();
};

// const openDetailModal = async () => {
//   await orderVantourStore.getHotelData();
//   modalDetailOpen.value = true;
// };

const copyDetail = async () => {
  let formattedOutput;
  formattedOutput = `
🌇 Hotel Name: ${detail?.value.name}
🏠 Room type: ${chooseData?.value.name}
📆 CheckIn Date: ${checkin_date?.value != null ? checkin_date.value : "-"}
📆 CheckOut Date: ${checkout_date?.value != null ? checkout_date.value : "-"}
🔖 Breakfast: ${choosePax.value ? "YES" : "No"}
👩‍🦰 Room Qty: ${room_qty.value ? room_qty.value : "-"} pax
💰Total Amount: ${
    chooseData.value
      ? chooseData.value.room_price
      : detail?.value.lowest_room_price
  } thb
🌐 Web link : ${currentURL.value}
      `;

  copy(formattedOutput);
};

const confirmDetailAction = () => {
  copyDetail();
  console.log("====================================");
  console.log("copy");
  console.log("====================================");
  modalDetailOpen.value = false;
  modalOpen.value = true;
};

const openPart = ref("");
const open = (data) => {
  openPart.value = data;
  myBottomSheet.value.open();
};
const close = () => {
  openPart.value = "";
  myBottomSheet.value.close();
};

const chooseData = ref(null);
const choosePax = ref(false);
const chooseCount = ref(0);

const haveBreakfast = ref(false);
const chooseDataFunction = (data) => {
  chooseData.value = data;
  console.log("====================================");
  console.log(chooseData.value);
  console.log("====================================");
  chooseCount.value = 0;
  haveBreakfast.value = chooseData.value.has_breakfast == 1 ? true : false;
};

// const chooseCountMinus = () => {
//   chooseCount.value = chooseCount.value - 1;
// };
// const chooseCountPlus = () => {
//   chooseCount.value = chooseCount.value + 1;
// };

const getRoomTypeCount = ref(0);
const getRoomType = (rooms) => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].is_extra == 0) {
      getRoomTypeCount.value += 1;
    }
  }
};

const hasExtraRoom = ref(false);
const getDetail = async (id) => {
  loading.value = true;
  const res = await hotelStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  // if (res.data?.rooms.length > 0) {
  //   chooseData.value = res.data.rooms[0];
  //   haveBreakfast.value = chooseData.value.has_breakfast == 1 ? true : false;
  //   if (chooseData.value) {
  //     chooseCount.value = 0;
  //   }
  // }

  hasExtraRoom.value = res.data?.rooms?.some((room) => room.is_extra === 1);
  console.log("Has extra room:", hasExtraRoom.value);

  getRoomType(res?.data?.rooms);
  detail.value = res.data;
  const response = await hotelStore.getSimpleListAction({
    place: detail.value?.place,
  });

  console.log(response, "this is list");
  placeList.value = response.data;
  loading.value = false;
};

const modalOpen = ref(false);
const viberModalOpen = ref(false);
const type = ref("");

const viberModalOpenFunction = (data) => {
  modalOpen.value = false;
  type.value = data;
  viberModalOpen.value = true;
};

const viberModalCloseFunction = () => {
  type.value = "";
  viberModalOpen.value = false;
};

const backLeftFunction = () => {
  type.value = "";
  viberModalOpen.value = false;
  modalOpen.value = true;
};

const goDetialPage = (id) => {
  router.push({
    name: "HomeDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const showDiv = ref(false);
const scrollY = ref(0);
const handleScroll = () => {
  scrollY.value = window.scrollY;
  // Set showDiv to true if the scroll position is over 300px, otherwise false
  showDiv.value = window.scrollY > 427;
  // console.log(window.scrollY);
};

const imageStyles = computed(() => {
  const opacity = Math.max(1 - scrollY.value / 300, 0); // Reduce opacity as user scrolls
  return {
    opacity: opacity,
  };
});

const tagsNum = ref(1);

watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

const shareContent = () => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this awesome content!",
        text: "Here is some interesting content you might like.",
        url: window.location.href, // Current page URL
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing", error));
  } else {
    console.error("Web Share API not supported");
  }
};

const currentURL = ref("");

const getDateChange = async (data) => {
  console.log(data, "this is calendar data");
  await orderVantourStore.changeHotelStoreData(data);
  closeCalendar();
};

onMounted(async () => {
  if (route.query.language) {
    await settingStore.changeLanguage(route.query.language);
    await settingStore.getLanguage();
  } else {
    await settingStore.getLanguage();
  }
  await orderVantourStore.getHotelData();
  window.addEventListener("scroll", handleScroll);
  currentURL.value = window.location.href;
  await getDetail(route.params.id);
});

onBeforeUnmount(() => {
  // Clean up the scroll event listener when the component is destroyed
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
