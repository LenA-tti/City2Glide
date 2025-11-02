/**
 * Pagination Component - React Native
 * 
 * Pagination with page navigation, next and previous links.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisible);
    }

    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>

      <View style={styles.pages}>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageButton,
                page === currentPage && styles.pageButtonActive,
              ]}
              onPress={() => onPageChange(page)}
            >
              <Text
                style={[
                  styles.pageText,
                  page === currentPage && styles.pageTextActive,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text key={index} style={styles.ellipsis}>
              {page}
            </Text>
          )
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.buttonDisabled,
        ]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    color: '#1f2937',
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  pageButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  pageText: {
    fontSize: 14,
    color: '#1f2937',
  },
  pageTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  ellipsis: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 8,
  },
});
