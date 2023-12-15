<script setup lang="ts">
   import { IconAsterisk } from "@tabler/icons-vue";
   import {
      IconCoins,
      IconCoin,
      IconPencil,
      IconArrowRight,
   } from "@tabler/icons-vue";
   import { ref } from "vue";

   let picked = ref("");
</script>

<template>
   <main class="h-screen grid grid-cols-2 gap-0.5 bg-lime-200">
      <div
         class="flex flex-col items-start justify-center gap-6 h-full py-8 px-16 ring-2 ring-black"
      >
         <span class="font-teko text-9xl leading-[0.8]"
            >Track your expenses</span
         >
         <span class="text-lg">Get a hold of all your purchases.</span>
         <button
            class="p-3 text-black hover:text-lime-200 duration-300 transition-colors tracking-wider flex items-center gap-2 ring-2 ring-black group relative isolate overflow-hidden"
         >
            <span>Get going</span>
            <IconArrowRight :size="20" />
            <span
               class="absolute -inset-1.5 bg-black -z-20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -skew-x-12"
            ></span>
         </button>
      </div>
      <div class="h-full flex items-center justify-center ring-2 ring-black">
         <img
            src="./assets/expense.png"
            alt="illus"
            class="aspect-square max-w-2xl"
         />
      </div>
   </main>
   <section class="h-screen bg-purple-300 grid grid-cols-2 gap-0.5 mt-0.5">
      <div class="ring-2 ring-black flex items-center justify-center p-12">
         <div
            class="flex flex-col gap-8 bg-purple-500 h-full w-full p-8 ring-2 ring-black"
         >
            <span class="flex flex-col gap-4">
               <span class="flex justify-start items-center gap-4">
                  <span class="p-3 ring-2 ring-black bg-lime-200"
                     ><IconCoins :size="24"
                  /></span>
                  <h2 class="font-teko text-4xl">Add Expense/Payout</h2>
               </span>
               <p class="text-lg max-w-lg tracking-wide text-slate-800">
                  Add either
                  <strong>expense or payout</strong>
                  in your tracker - and start addressing your funds.
               </p>
            </span>
            <span class="w-full h-0.5 bg-black/20"></span>
            <form
               class="flex-1 flex flex-col justify-between gap-4 tracking-wide"
            >
               <div class="flex justify-between items-center">
                  <strong class="text-lg">Expense/Payout:</strong>
                  <span class="flex gap-6 font-semibold">
                     <label for="payout" class="flex items-center gap-2">
                        <span>Payout</span>
                        <input
                           type="radio"
                           name="type"
                           id="payout"
                           value="payout"
                           v-model="picked"
                           required
                        />
                     </label>
                     <label for="expense" class="flex items-center gap-2">
                        <span>Expense</span>
                        <input
                           type="radio"
                           name="type"
                           id="expense"
                           value="expense"
                           v-model="picked"
                        />
                     </label>
                  </span>
               </div>
               <div class="flex flex-col gap-2">
                  <label for="info" class="font-bold text-lg">Info:</label>
                  <span class="flex items-center gap-0.5">
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconPencil :size="28" />
                     </span>
                     <input
                        type="text"
                        name="Info"
                        id="info"
                        required
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl font-semibold outline-none"
                     />
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconAsterisk :size="28" />
                     </span>
                  </span>
               </div>
               <div class="flex flex-col gap-2">
                  <label for="amount" class="font-bold text-lg">Amount:</label>
                  <span class="flex items-center gap-0.5">
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconCoin :size="28" />
                     </span>
                     <input
                        type="text"
                        name="amount"
                        id="amount"
                        required
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl font-semibold outline-none"
                     />
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconAsterisk :size="28" />
                     </span>
                  </span>
               </div>
               <div
                  class="p-3 bg-lime-200 ring-2 ring-black text-lg font-semibold"
               >
                  <button type="submit" class="tracking-wide w-full">
                     Add
                  </button>
               </div>
            </form>
         </div>
      </div>
      <div class="ring-2 ring-black"></div>
   </section>
</template>
