<script setup lang="ts">
   import {
      IconCoins,
      IconCoin,
      IconAsterisk,
      IconCheck,
      IconTrash,
      IconInfoCircle,
      IconEdit,
   } from "@tabler/icons-vue";
   import { Ref, onMounted, ref } from "vue";
   import { gsap } from "gsap";

   type Transaction = {
      id: string;
      type: string;
      info: string;
      amount: number | null;
   }[];

   let radio: Ref<string> = ref("");
   let info: Ref<string> = ref("");
   let amount: Ref<number | null> = ref(null);
   let transactions: Ref<Transaction> = ref([]);
   const form: Ref<null> = ref(null);
   const input: Ref<null> = ref(null);

   onMounted(() => {
      const savedTransactions: Transaction = JSON.parse(
         localStorage.getItem("transactions") || ""
      );

      if (savedTransactions) {
         transactions.value = savedTransactions;
      }

      const tl = gsap.timeline({ delay: 0.8, paused: true });

      tl.from(form.value, {
         duration: 1,
         y: "-200",
         autoAlpha: 0,
         ease: "back.out(1.8)",
      });
      tl.play();
   });

   const saveToLocal = () => {
      localStorage.setItem("transactions", JSON.stringify(transactions.value));
   };

   function addTransaction(radio: string, info: string, amount: number | null) {
      let index: string = crypto.randomUUID();
      transactions.value.push({
         id: index,
         type: radio,
         info: info,
         amount: amount,
      });

      saveToLocal();

      this.radio = "";
      this.info = "";
      this.amount = null;
   }

   const deleteTransaction = (id: string) => {
      transactions.value = transactions.value.filter(
         (transaction) => transaction.id != id
      );
      saveToLocal();
   };
</script>

<template>
   <main
      class="min-h-screen bg-purple-300 grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-0.5"
   >
      <div
         class="h-screen ring-2 ring-black flex items-center justify-center p-6 md:p-12 overflow-hidden"
      >
         <div
            class="flex flex-col gap-8 bg-purple-500 h-full w-full p-4 md:p-8 ring-2 ring-black"
            ref="form"
         >
            <span class="flex flex-col gap-4">
               <span class="flex justify-start items-center gap-4">
                  <span class="p-3 ring-2 ring-black bg-lime-200"
                     ><IconCoins :size="24"
                  /></span>
                  <h2 class="font-teko text-3xl md:text-4xl">
                     Add Expense/Payout
                  </h2>
               </span>
               <p
                  class="text-base md:text-lg max-w-lg tracking-wide text-slate-800"
               >
                  Add either
                  <strong>expense or payout</strong>
                  in your tracker - and start addressing your funds.
               </p>
            </span>
            <span class="w-full h-0.5 bg-black/20"></span>
            <form
               class="flex-1 flex flex-col justify-between gap-4 tracking-wide"
               @submit.prevent="addTransaction(radio, info, amount)"
            >
               <div
                  class="flex flex-col md:flex-row justify-between md:items-center gap-4"
               >
                  <strong class="text-lg">Expense/Payout:</strong>
                  <span class="flex gap-6 font-semibold">
                     <label for="payout" class="flex items-center gap-2">
                        <span>Payout</span>
                        <span class="relative flex">
                           <input
                              type="radio"
                              name="type"
                              id="payout"
                              value="payout"
                              v-model="radio"
                              required
                              class="opacity-0 aspect-square w-6 peer"
                           />
                           <span
                              class="absolute inset-0 ring-2 ring-black/40 peer-hover:ring-black peer-checked:ring-black bg-slate-200/40 peer-checked:bg-lime-200"
                           >
                              <IconCheck />
                           </span>
                        </span>
                     </label>
                     <label for="expense" class="flex items-center gap-2">
                        <span>Expense</span>
                        <span class="relative flex">
                           <input
                              type="radio"
                              name="type"
                              id="expense"
                              value="expense"
                              v-model="radio"
                              class="opacity-0 aspect-square w-6 peer"
                           />
                           <span
                              class="absolute inset-0 ring-2 ring-black/40 peer-hover:ring-black peer-checked:ring-black bg-slate-200/40 peer-checked:bg-lime-200"
                           >
                              <IconCheck />
                           </span>
                        </span>
                     </label>
                  </span>
               </div>
               <div class="flex flex-col gap-2">
                  <label for="info" class="font-bold text-lg">Info:</label>
                  <span class="flex items-center gap-0.5">
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconInfoCircle :size="28" />
                     </span>
                     <input
                        type="text"
                        name="Info"
                        id="info"
                        required
                        autocomplete="off"
                        v-model="info"
                        placeholder="concise info"
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
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
                        type="number"
                        name="amount"
                        id="amount"
                        required
                        autocomplete="off"
                        min="0.1"
                        step="0.01"
                        v-model="amount"
                        placeholder="amount"
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
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
      <div class="ring-2 ring-black p-6 md:p-12 overflow-hidden">
         <div class="flex flex-col gap-4 h-full">
            <span class="flex flex-col gap-4" ref="input">
               <span
                  class="flex gap-0.5"
                  v-for="transaction in transactions"
                  :key="transaction.id"
               >
                  <span
                     class="w-full flex flex-col gap-0.5 ring-2 ring-black font-semibold uppercase tracking-wider"
                  >
                     <span class="text-xl ring-2 ring-black p-2 bg-lime-200">{{
                        transaction.info
                     }}</span>
                     <span
                        class="text-xl ring-2 ring-black p-2"
                        :class="
                           transaction.type === 'payout'
                              ? 'bg-lime-200'
                              : 'bg-rose-300'
                        "
                        >{{ transaction.amount }}$</span
                     >
                  </span>
                  <span class="flex flex-col gap-0.5">
                     <button
                        class="p-2 ring-2 ring-black flex justify-center bg-indigo-300"
                     >
                        <IconEdit :size="28" />
                     </button>
                     <button
                        class="p-2 ring-2 ring-black flex justify-center bg-rose-300"
                        @click="deleteTransaction(transaction.id)"
                     >
                        <IconTrash :size="28" />
                     </button>
                  </span>
               </span>
            </span>
         </div>
      </div>
   </main>
</template>

<style scoped>
   input[type="number"] {
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: textfield;
   }

   input[type="number"]::-webkit-inner-spin-button,
   input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
   }
</style>
