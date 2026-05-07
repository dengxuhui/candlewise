/**
 * useProgress.js — 学习进度管理 Hook
 * 对 progressStore 的语义化封装，供页面组件使用
 */

import { useProgressStore } from '../store/progressStore.js'

export function useProgress() {
  const store = useProgressStore()

  /**
   * 获取模块练习完成百分比（0–100）
   * 综合考虑课时完成度（如无课时则只看 passed）
   */
  function getProgressPercent(moduleId) {
    const prog = store.moduleProgress[moduleId]
    if (!prog) return 0
    // 无课时的模块（synthesis）：passed = 100%，否则 0%
    if (prog.total === 0) return prog.passed ? 100 : 0
    // 有课时：课时完成比例作为进度（通过练习额外奖励展示在外层）
    const lessonPct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0
    // 若已通过练习则显示 100%
    return prog.passed ? 100 : lessonPct
  }

  /**
   * 检查某课时是否已完成
   */
  function isLessonCompleted(lessonId) {
    return store.completedLessons.includes(lessonId)
  }

  /**
   * 获取某模块的最近练习记录（按时间倒序）
   */
  function getModuleHistory(moduleId) {
    // practiceHistory 中没有 moduleId 字段，需要通过 caseId 前缀判断
    // 此处直接返回全部历史，供调用方自行过滤
    return store.practiceHistory
  }

  return {
    /** 各模块原始进度数据 { completed, total, passed } */
    moduleProgress: store.moduleProgress,
    /** 已完成的课时 id 列表 */
    completedLessons: store.completedLessons,
    /** 答题历史记录 */
    practiceHistory: store.practiceHistory,

    /** 模块是否已解锁 */
    isUnlocked: store.isModuleUnlocked,
    /** 模块进度百分比 (0–100) */
    getProgressPercent,
    /** 课时是否已完成 */
    isLessonCompleted,
    /** 模块练习历史 */
    getModuleHistory,

    /** 标记课时完成 */
    completeLesson: store.completeLesson,
    /** 记录一次答题结果 */
    recordAnswer: store.recordPracticeResult,
    /** 更新模块通过状态 */
    markModulePassed: store.updateModuleProgress,
    /** 重置所有进度（调试用） */
    resetProgress: store.resetProgress,
  }
}
