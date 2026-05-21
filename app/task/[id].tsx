import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTaskStore } from '../../src/store/useTaskStore';
import { globalStyles } from '../../src/styles/global';
import { Feather } from '@expo/vector-icons';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const task = useTaskStore((state) => state.tasks.find((t) => t._id === id));

  if (!task) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>Tarefa não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Detalhes da Tarefa</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{task.text}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, task.completed ? styles.completed : styles.pending]}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </Text>

          {task.dueDate && (
            <>
              <Text style={styles.label}>Prazo:</Text>
              <Text style={styles.value}>{new Date(task.dueDate).toLocaleDateString()}</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  completed: {
    color: '#43a047',
  },
  pending: {
    color: '#e53935',
  },
});