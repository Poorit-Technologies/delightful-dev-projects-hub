
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TestConfig, Category } from './TestConfigurationApp';
import { useTestDefinitions } from '@/hooks/useTestDefinitions';

interface SaveConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testConfig: TestConfig;
  categories: Category[];
}

const SaveConfigurationDialog = ({ 
  open, 
  onOpenChange, 
  testConfig, 
  categories 
}: SaveConfigurationDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const { saveTestDefinition } = useTestDefinitions();

  const handleSave = async () => {
    if (!name.trim()) return;

    setSaving(true);
    const result = await saveTestDefinition(name, description, testConfig, categories);
    setSaving(false);

    if (result) {
      setName('');
      setDescription('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Test Configuration</DialogTitle>
          <DialogDescription>
            Give your test configuration a name and description to save it for later use.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Configuration Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Software Skills Assessment"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this test configuration..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || saving}>
            {saving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfigurationDialog;
