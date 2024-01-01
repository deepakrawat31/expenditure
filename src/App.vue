<script setup lang="ts">
   import {
      IconCoins,
      IconAsterisk,
      IconCheck,
      IconTrash,
      IconInfoCircle,
      IconEdit,
      IconWallet,
      IconX,
   } from "@tabler/icons-vue";
   import { Ref, computed, onMounted, ref } from "vue";
   import { gsap } from "gsap";

   type Transaction = {
      id: string;
      type: string;
      info: string;
      amount: number;
   }[];

   let radio: Ref<string> = ref("payout");
   let info: Ref<string> = ref("");
   let editInfo: Ref<string> = ref("");
   let amount: Ref<number> = ref(0);
   let editAmount: Ref<number> = ref(0);
   let transactions: Ref<Transaction> = ref([]);
   let editPan: Ref<boolean> = ref(false);
   let editId: Ref<string> = ref("");
   const form: Ref<null> = ref(null);
   const output: Ref<null> = ref(null);

   onMounted(() => {
      const savedTransactions: Transaction = JSON.parse(
         localStorage.getItem("transactions") || ""
      );

      if (savedTransactions) {
         transactions.value = savedTransactions;
      }

      const tl = gsap.timeline({ delay: 0.5, paused: true });

      tl.from(form.value, {
         duration: 1,
         y: "-200",
         autoAlpha: 0,
         ease: "back.out(1.8)",
      });
      tl.from(output.value, {
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

   function addTransaction(radio: string, info: string, amount: number) {
      let index: string = crypto.randomUUID();
      transactions.value.push({
         id: index,
         type: radio,
         info: info,
         amount: amount,
      });

      saveToLocal();

      this.info = "";
      this.amount = 0;
      this.radio = "payout";
   }

   const deleteTransaction = (id: string) => {
      transactions.value = transactions.value.filter(
         (transaction) => transaction.id != id
      );
      saveToLocal();
   };

   const editTransaction = (id: string) => {
      transactions.value.map((transition) => {
         if (id === transition.id) {
            transition.info = editInfo.value;
            transition.amount = editAmount.value;
            saveToLocal();
            editPan.value = false;
         }
      });
   };

   const balance = computed(() => {
      return transactions.value.reduce((acc, transaction) => {
         if (transaction.type === "payout") {
            return acc + transaction.amount;
         } else {
            return acc - transaction.amount;
         }
      }, 0);
   });
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
                  <span class="p-2.5 ring-2 ring-black bg-lime-200"
                     ><IconCoins :size="28"
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
                        placeholder="info"
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl uppercase tracking-wider font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
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
                        <IconCoins :size="28" />
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
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl uppercase tracking-wider font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
                     />
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconAsterisk :size="28" />
                     </span>
                  </span>
               </div>
               <div
                  class="p-3 bg-lime-200 ring-2 ring-black text-lg font-semibold"
               >
                  <button type="submit" class="tracking-wider w-full">
                     ADD
                  </button>
               </div>
            </form>
         </div>
      </div>
      <div class="ring-2 ring-black p-6 md:p-12 h-screen">
         <div class="flex flex-col gap-4 h-full" ref="output">
            <span class="flex items-center justify-between gap-0.5 p-1">
               <span class="ring-2 ring-black p-2 bg-purple-400"
                  ><IconWallet :size="28" />
               </span>
               <span
                  class="flex-1 flex justify-between items-center text-xl font-semibold uppercase tracking-wider ring-2 ring-black p-2 bg-purple-400"
               >
                  <span>balance</span>
                  <span>{{ balance }}</span>
               </span>
            </span>
            <span
               class="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-500 hover:scrollbar-thumb-slate-400 active:scrollbar-thumb-slate-500 scrollbar-track-slate-200"
            >
               <ul
                  class="flex flex-col-reverse justify-end gap-4 absolute inset-0 px-1 pt-1 pb-4"
               >
                  <li
                     class="flex gap-0.5"
                     v-for="transaction in transactions"
                     :key="transaction.id"
                  >
                     <span
                        class="w-full flex flex-col gap-0.5 text-xl font-semibold uppercase tracking-wider"
                     >
                        <span class="ring-2 ring-black p-2 bg-lime-200">{{
                           transaction.info
                        }}</span>
                        <span
                           class="ring-2 ring-black p-2"
                           :class="
                              transaction.type === 'payout'
                                 ? 'bg-lime-200'
                                 : 'bg-rose-300'
                           "
                           >{{ transaction.amount }}</span
                        >
                     </span>
                     <span class="flex flex-col gap-0.5">
                        <button
                           class="p-2 ring-2 ring-black bg-purple-400"
                           @click="
                              () => {
                                 editId = transaction.id;
                                 editInfo = transaction.info;
                                 editAmount = transaction.amount;
                                 editPan = true;
                              }
                           "
                        >
                           <IconEdit :size="28" />
                        </button>
                        <button
                           class="p-2 ring-2 ring-black bg-rose-300"
                           @click="deleteTransaction(transaction.id)"
                        >
                           <IconTrash :size="28" />
                        </button>
                     </span>
                  </li>
               </ul>
            </span>
         </div>
      </div>
      <div
         v-if="editPan"
         class="fixed z-20 inset-0 bg-slate-900/40 flex items-center justify-center p-4"
      >
         <span
            class="max-w-lg w-full bg-purple-500 ring-2 ring-black flex flex-col gap-6 p-4 md:p-8"
         >
            <span class="flex items-center justify-between w-full">
               <span class="font-bold text-5xl capitalize font-teko">Edit</span>
               <button
                  @click="
                     () => {
                        editPan = false;
                     }
                  "
                  class="p-2 ring-2 ring-black bg-rose-300 w-fit"
               >
                  <IconX :size="28" />
               </button>
            </span>
            <form
               @submit.prevent="editTransaction(editId)"
               class="w-full flex flex-col gap-8"
            >
               <div class="flex flex-col gap-2">
                  <label for="edit-info" class="font-bold text-lg">Info:</label>
                  <span class="flex items-center gap-0.5">
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconInfoCircle :size="28" />
                     </span>
                     <input
                        type="text"
                        name="edit-info"
                        id="edit-info"
                        autocomplete="off"
                        v-model="editInfo"
                        placeholder="info"
                        required
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl uppercase tracking-wider font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
                     />
                  </span>
               </div>
               <div class="flex flex-col gap-2">
                  <label for="edit-amount" class="font-bold text-lg"
                     >Amount:</label
                  >
                  <span class="flex items-center gap-0.5">
                     <span class="p-2 bg-lime-200 ring-2 ring-black">
                        <IconCoins :size="28" />
                     </span>
                     <input
                        type="number"
                        name="edit-amount"
                        id="edit-amount"
                        autocomplete="off"
                        min="0.1"
                        step="0.01"
                        v-model="editAmount"
                        placeholder="amount"
                        required
                        class="bg-lime-200 h-11 w-full ring-2 ring-black px-2 text-xl uppercase tracking-wider font-semibold outline-none placeholder:text-black/60 placeholder:text-lg placeholder:uppercase"
                     />
                  </span>
               </div>
               <div
                  class="p-3 bg-lime-200 ring-2 ring-black text-lg font-semibold"
               >
                  <button type="submit" class="tracking-wider w-full">
                     SAVE
                  </button>
               </div>
            </form>
         </span>
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
