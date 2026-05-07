/**
 * progressStore.js — Zustand 全局进度状态
 * 数据结构规范：SPEC.md §7
 * 持久化：localStorage key = "candlewise-progress"
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CURRICULUM, MODULE_MAP } from '../data/curriculum.js'

/** 根据 curriculum 生成初始 moduleProgress */
function buildInitialModuleProgress() {
  return Object.fromEntries(
    CURRICULUM.map((m) => [
      m.id,
      {
        completed: 0,          // 已完成课时数
        total: m.lessons.length, // 该模块课时总数
        passed: false,         // 练习是否通过（≥ 3/5 正确）
      },
    ])
  )
}

export const useProgressStore = create(
  persist(
    (set, get) => ({
      completedLessons: [],
      moduleProgress: buildInitialModuleProgress(),
      practiceHistory: [],

      /**
       * 标记某课时为已完成，同时更新所属模块的 completed 计数
       */
      completeLesson(lessonId) {
        const state = get()
        if (state.completedLessons.includes(lessonId)) return

        // 找出该课时属于哪个模块
        const module = CURRICULUM.find((m) =>
          m.lessons.some((l) => l.id === lessonId)
        )

        set((s) => {
          const next = { ...s.moduleProgress }
          if (module) {
            next[module.id] = {
              ...next[module.id],
              completed: next[module.id].completed + 1,
            }
          }
          return {
            completedLessons: [...s.completedLessons, lessonId],
            moduleProgress: next,
          }
        })
      },

      /**
       * 记录一次答题结果
       */
      recordPracticeResult(caseId, correct) {
        set((s) => ({
          practiceHistory: [
            ...s.practiceHistory,
            { caseId, correct, timestamp: Date.now() },
          ],
        }))
      },

      /**
       * 更新模块练习通过状态
       * @param {string} moduleId
       * @param {boolean} passed  得分 >= 3/5 视为通过
       */
      updateModuleProgress(moduleId, passed) {
        set((s) => ({
          moduleProgress: {
            ...s.moduleProgress,
            [moduleId]: {
              ...s.moduleProgress[moduleId],
              passed,
            },
          },
        }))
      },

      /**
       * 判断模块是否已解锁
       * - unlockRequires === null → 默认解锁（Module 1）
       * - 否则检查所有依赖模块的 passed 状态
       */
      isModuleUnlocked(moduleId) {
        const module = MODULE_MAP[moduleId]
        if (!module) return false
        if (module.unlockRequires === null) return true

        const { moduleProgress } = get()
        return module.unlockRequires.every(
          (reqId) => moduleProgress[reqId]?.passed === true
        )
      },

      /** 重置所有进度（开发/调试用） */
      resetProgress() {
        set({
          completedLessons: [],
          moduleProgress: buildInitialModuleProgress(),
          practiceHistory: [],
        })
      },
    }),
    {
      name: 'candlewise-progress',
      // 仅持久化需要的字段，避免存储函数
      partialize: (s) => ({
        completedLessons: s.completedLessons,
        moduleProgress: s.moduleProgress,
        practiceHistory: s.practiceHistory,
      }),
    }
  )
)
